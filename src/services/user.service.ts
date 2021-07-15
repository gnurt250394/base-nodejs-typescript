import { ROLE, RoleType } from '@/common/Constants';
import { AuthDto } from '@/dtos/auth.dto';
import { ApiError } from '@/exceptions/ErrorHandler';
import { inject, iocContainer, ProvideSingleton } from '@/ioc';
import { IUserModel } from '@/models/user.model';
import { UserRepository } from '@/repositories/mongo/user.repository';
import constants from '@configs/constants';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { BaseService } from '@services/BaseService';
import { isEmpty } from '@utils/util';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import NotificationService from './notification.service';
@ProvideSingleton(UserService)
export class UserService extends BaseService<IUserModel> {
  constructor(@inject(UserRepository) protected repository: UserRepository) {
    super();
  }

  public async getDetail(userId: string, role: RoleType) {
    let user = await this.repository.findOne({ _id: userId, role });
    return user;
  }

  /** LOGIN */
  public async login(userData: AuthDto, role: RoleType): Promise<IUserModel> {
    if (isEmpty(userData)) throw new ApiError({ ...constants.errorTypes.validation, fields: { name: { message: 'dữ liệu không hợp lệ' } } });

    const findUser: any = await this.repository.findOne({ phone: userData.phone, role });
    if (!findUser) throw new ApiError(constants.errorTypes.validation);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);

    if (!isPasswordMatching) throw new ApiError(constants.errorTypes.validation);
    const obj: any = { accessToken: userData.accessToken };
    if (userData.latitude && userData.longitude && (findUser?.latitude != userData?.latitude || findUser.longitude != userData.longitude)) {
      obj.latitude = userData.latitude;
      obj.longitude = userData.longitude;
      obj.address = userData.address;
    }
    const response = await this.repository.findOneAndUpdate({ phone: userData.phone, role }, obj, {
      new: true,
      projection: { password: 0 },
    });

    const tokenData = this.createToken(response, role);
    const cookie = this.createCookie(tokenData);

    if (role != ROLE.ADMIN && userData.accessToken) {
      const notificationService = iocContainer.get<NotificationService>(NotificationService);
      notificationService.subscribeToTopic(userData.accessToken, response._id);
    }
    response['loginToken'] = tokenData.token;
    return response;
  }

  /** SIGNUP */
  public async signup(userData: AuthDto, role: RoleType): Promise<IUserModel> {
    if (isEmpty(userData)) throw new ApiError({ statusCode: 400, message: "You're not userData", name: 'userData' });

    const findUser: IUserModel = await this.repository.findOne({ phone: userData.phone, role });
    if (findUser) throw new ApiError({ statusCode: 409, message: `Số điện thoại: ${userData.phone} đã tồn tại trong hệ thống`, name: '' });

    const { phone, password, latitude, longitude, address, accessToken } = userData;
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const data: IUserModel = await this.repository.create({
      ...userData,
      role,
      password: hashedPassword,
    });
    if (role != ROLE.ADMIN && userData.accessToken) {
      const notificationService = iocContainer.get<NotificationService>(NotificationService);
      notificationService.subscribeToTopic(userData.accessToken, data._id);
    }
    delete data['password'];
    return data;
  }

  /** LOGOUT */
  public async logout(userData: AuthDto, role: RoleType): Promise<IUserModel> {
    if (isEmpty(userData)) throw new ApiError({ statusCode: 400, message: "You're not userData", name: 'userData' });

    const findUser: IUserModel = await this.repository.findOne({ phone: userData.phone, password: userData.password, role });
    if (!findUser) throw new ApiError({ statusCode: 409, name: '', message: `You're email ${userData.phone} not found` });
    // if (role != ROLE.ADMIN && userData.accessToken) {
    //   const notificationService = iocContainer.get<NotificationService>(NotificationService);
    //   notificationService.subscribeToTopic(userData.accessToken, data._id);
    // }
    return findUser;
  }

  /**
   *
   * @param userData
   * @param role
   * @returns
   */
  public async forgotPassword(userData: AuthDto, role: RoleType): Promise<IUserModel> {
    if (isEmpty(userData)) throw new ApiError({ ...constants.errorTypes.validation });
    const isPhone = await this.repository.exists({
      phone: userData.phone,
      role,
    });
    if (!isPhone) {
      throw new ApiError({ ...constants.errorTypes.validation });
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const response: IUserModel = await this.repository.findOneAndUpdate(
        { phone: userData.phone, role },
        {
          ...userData,
          phone: userData.phone,
          password: hashedPassword,
        },
        { new: true, projection: { password: 0 } },
      );

      const tokenData = this.createToken(response, role);
      const data = response;
      response['loginToken'] = tokenData.token;
      if (role != ROLE.ADMIN && userData.accessToken) {
        const notificationService = iocContainer.get<NotificationService>(NotificationService);
        notificationService.subscribeToTopic(userData.accessToken, data._id);
      }
      return response;
    }
  }
  public createToken(user: IUserModel, role: RoleType): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id, role };
    const secret: string = constants.secretKey;
    const refressTokenSecretKey: string = constants.refressTokenSecretKey;
    const expiresInrefressToken: number = 60 * 60 * 24;
    const expiresIn: number = 60 * 60 * 24;
    const token = jwt.sign(dataStoredInToken, secret, {});
    const refreshToken = jwt.sign(dataStoredInToken, refressTokenSecretKey, { expiresIn: expiresInrefressToken });
    return { expiresIn, token, refreshToken };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

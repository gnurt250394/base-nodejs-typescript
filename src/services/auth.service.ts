import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/users.dto';
import HttpException from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { RoleType, User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { Document } from 'mongoose';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto, role: RoleType): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");


    const findUser: User = await this.users.findOne({ phone: userData.phone, role });
    if (findUser) throw new HttpException(409, `You're email ${userData.phone} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: CreateUserDto, role: RoleType): Promise<{ cookie: string; response: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ phone: userData.phone, role });
    if (!findUser) throw new HttpException(409, `Số điện thoại ${userData.phone} không tìm thấy`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Mật khẩu không đúng");

    let obj: any = { accessToken: userData.accessToken };
    if (
      userData.latitude &&
      userData.longitude &&
      (findUser.latitude != userData.latitude || findUser.longitude != userData.longitude)
    ) {
      obj.latitude = userData.latitude;
      obj.longitude = userData.longitude;
      obj.address = userData.address;
    }
    let response: User & Document = await this.users.findOneAndUpdate(
      { phone: userData.phone, role },
      obj,
      {
        new: true,
        projection: { password: 0 }
      }
    );

    const tokenData = this.createToken(response);
    const cookie = this.createCookie(tokenData);

    let data = response.toObject()
    data['loginToken'] = tokenData.token

    return { cookie, response: data };
  }

  public async logout(userData: User, role: RoleType): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ phone: userData.phone, password: userData.password, role });
    if (!findUser) throw new HttpException(409, `You're email ${userData.phone} not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secret: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;

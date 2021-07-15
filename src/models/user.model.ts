import { GenderType, LevelType, RoleType } from '@/common/Constants';
import { BaseFormatter } from './BaseFormatter';

export interface IUserModel {
  _id?: string;
  id?: string;
  accessToken?: string;
  name?: string;
  email?: string;
  dob?: string;
  password?: string;
  phone?: string;
  gender?: GenderType;
  latitude?: number;
  longitude?: number;
  avatar?: string;
  role?: RoleType;
  address?: string;
  province_id?: string;
  commune_id?: string;
  district_id?: string;
  // giới thiệu bản thân
  overview?: string;
  // trình độ
  level?: LevelType;
  // kỹ năng
  skill?: string;
  //kinh nghiệm làm việc
  experience?: string;
  active?: boolean;
  loginToken?: string;

  fieldId?: any[];
  fields?: any;
}

export class UserFormatter extends BaseFormatter implements IUserModel {
  public email = undefined;
  public name = undefined;
  public accessToken = undefined;
  public password = undefined;
  public dob = undefined;
  public phone = undefined;
  public gender = undefined;
  public latitude = undefined;
  public longitude = undefined;
  public avatar = undefined;
  public role = undefined;
  public address = undefined;
  public province_id = undefined;
  public commune_id = undefined;
  public district_id = undefined;
  // giới thiệu bản thân
  public overview = undefined;
  // trình độ
  public level = undefined;
  // kỹ năng
  public skill = undefined;
  //kinh nghiệm làm việc
  public experience = undefined;
  public active = undefined;
  public loginToken = undefined;

  // public fieldId = undefined;
  // public fields = undefined;

  constructor(args: any) {
    super();
    this.format(args);
  }
}

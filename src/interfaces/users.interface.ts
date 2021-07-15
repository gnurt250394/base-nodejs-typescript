import { LevelType, RoleType } from '@/common/Constants';

export interface User {
  _id?: string;
  accessToken?: string;
  name?: string;
  email?: string;
  dob?: string;
  password?: string;
  phone?: string;
  gender?: string;
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

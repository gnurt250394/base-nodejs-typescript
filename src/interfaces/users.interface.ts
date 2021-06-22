export type RoleType = "user" | 'admin' | 'partner'
export type LevelType = "1" | '2' | '3' | '4' | '5' | '6'
export interface User {
  _id: string;
  accessToken?: string,
  name?: string,
  email?: string,
  dob?: string,
  password?: string,
  phone?: string,
  gender?: string,
  latitude?: number,
  longitude?: number,
  avatar?: string,
  role?: RoleType
  address?: string
  province_id?: string
  commune_id?: string
  district_id?: string
  // giới thiệu bản thân
  overview?: string
  // trình độ
  level?: LevelType
  // kỹ năng
  skill?: string
  //kinh nghiệm làm việc
  experience?: string
  active?: boolean
  loginToken?: string
}

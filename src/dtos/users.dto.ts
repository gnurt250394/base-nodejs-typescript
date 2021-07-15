import { LevelType, RoleType } from '@/common/Constants';
import { checkPhoneNumberVietnamese } from '@/utils/util';
import { IsEmail, IsString, IS_MOBILE_PHONE, isMobilePhone, IsOptional, isPhoneNumber, Matches } from 'class-validator';

export class CreateUserDto {
  @Matches(checkPhoneNumberVietnamese, { message: 'Số điện thoại không đúng định dạng' })
  @IsOptional()
  public phone: string;

  @IsString({ message: 'Mật khẩu không được để trống' })
  @IsOptional()
  public password: string;

  @IsOptional()
  public latitude: number;
  @IsOptional()
  public longitude: number;
  @IsOptional()
  public address: string;
  @IsOptional()
  public accessToken: string;

  @IsOptional()
  public name?: string;
  @IsOptional()
  public email?: string;
  @IsOptional()
  public dob?: string;
  @IsOptional()
  public gender?: string;
  @IsOptional()
  public avatar?: string;
  @IsOptional()
  public role?: RoleType;
  @IsOptional()
  public province_id?: string;
  @IsOptional()
  public commune_id?: string;
  @IsOptional()
  public district_id?: string;
  // giới thiệu bản thân
  @IsOptional()
  public overview?: string;
  // trình độ
  @IsOptional()
  public level?: LevelType;
  // kỹ năng
  @IsOptional()
  public skill?: string;
  //kinh nghiệm làm việc
  @IsOptional()
  public experience?: string;
  @IsOptional()
  public active?: boolean;
}

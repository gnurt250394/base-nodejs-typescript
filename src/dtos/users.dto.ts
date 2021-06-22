import { checkPhoneNumberVietnamese } from '@/utils/util';
import { IsEmail, IsString, IS_MOBILE_PHONE, isMobilePhone, IsOptional, isPhoneNumber, Matches } from 'class-validator';

export class CreateUserDto {
  @Matches(checkPhoneNumberVietnamese, { message: 'Số điện thoại không đúng định dạng' })
  public phone: string;

  @IsString()
  public password: string;

  @IsOptional()
  public latitude: number
  @IsOptional()
  public longitude: number
  @IsOptional()
  public address: string
  @IsOptional()
  public accessToken: string

}

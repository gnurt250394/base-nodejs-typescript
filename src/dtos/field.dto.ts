import { checkPhoneNumberVietnamese } from '@/utils/util';
import { IsEmail, IsString, IS_MOBILE_PHONE, isMobilePhone, IsOptional, isPhoneNumber, Matches } from 'class-validator';

export class FieldDto {
  @IsString({ message: 'Tên không được để trống' })
  @IsOptional()
  name: string;

  @IsOptional()
  note: string;
}

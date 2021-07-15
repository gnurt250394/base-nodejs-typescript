import { checkPhoneNumberVietnamese } from '@/utils/util';
import { IsEmail, IsString, IS_MOBILE_PHONE, isMobilePhone, IsOptional, isPhoneNumber, Matches } from 'class-validator';

export class AddressDto {
  @IsString()
  id: string;

  @IsOptional()
  page: number;
  @IsOptional()
  size: number;
}

import { IsOnlyDate } from '@/utils/validate';
import { IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, IsNumber, IsArray } from 'class-validator';

export class JobDto {
  @IsString({ message: 'Tên công việc không được để trống' })
  @IsNotEmpty({ message: 'Tên công việc không được để trống' })
  name: string;

  @IsOptional()
  note: string;

  @IsString({ message: 'Địa chỉ không được để trống' })
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string;

  @IsString({ message: 'Giá từ không được để trống' })
  @IsNotEmpty({ message: 'Giá từ không được để trống' })
  fromPrice: string;

  @IsString({ message: 'Giá đến không được để trống' })
  @IsNotEmpty({ message: 'Giá đến không được để trống' })
  toPrice: string;

  @IsArray({ message: 'Lĩnh vực không được để trống' })
  @IsNotEmpty({ message: 'Lĩnh vực không được để trống' })
  fieldId: string;

  @IsString({ message: 'Trình độ không được để trống' })
  @IsNotEmpty({ message: 'Trình độ không được để trống' })
  level: string;

  @IsOptional()
  description: string;

  @IsOptional()
  candidateRequest: string;

  @IsOptional()
  interest: string;

  @IsString({ message: 'Ngày hết hạn không được để trống' })
  @IsNotEmpty({ message: 'Ngày hết hạn không được để trống' })
  @IsOnlyDate()
  deadline: string;

  @IsNumber({}, { message: 'Kinh độ không được để trống' })
  @IsNotEmpty({ message: 'Kinh độ không được để trống' })
  @IsLatitude()
  latitude: number;

  @IsNumber({}, { message: 'Vĩ độ không được để trống' })
  @IsNotEmpty({ message: 'Vĩ độ không được để trống' })
  @IsLongitude()
  longitude: number;

  @IsOptional()
  timeStart: string;

  @IsOptional()
  timeEnd: string;

  partnerId?: string;
}

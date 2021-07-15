import { IsOnlyDate } from '@/utils/validate';
import { IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class RequestInterviewDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString({ message: 'Công việc không được để trống' })
  @IsNotEmpty({ message: 'Công việc không được để trống' })
  jobId: string;

  @IsString({ message: 'Ngày tháng không được để trống' })
  @IsNotEmpty({ message: 'Ngày tháng không được để trống' })
  date: string;

  @IsString({ message: 'Thời gian đến không được để trống' })
  @IsNotEmpty({ message: 'Thời gian đến không được để trống' })
  time: string;
}

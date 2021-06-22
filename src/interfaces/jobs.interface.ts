import { Model, Schema } from 'mongoose';
export interface JobModel {
  //tên công việc
  name: string
  // id của công ty
  partnerId: string
  latitude: number
  longitude: number
  // địa chỉ
  address: string
  // mức lương
  fromPrice: number
  // mức lương
  toPrice: number
  // mảng lĩnh vực
  fieldId: string[]
  // trình độ
  level: string

  deadline: number
  timeStart: number
  timeEnd: number
  // mô tả công việc
  description: string
  // yêu cầu với ứng viên
  candidateRequest: string
  // quyền lợi
  interest: string
  active: boolean
  status: boolean
}

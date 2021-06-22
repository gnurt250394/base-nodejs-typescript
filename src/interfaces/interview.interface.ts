import { Model, Schema } from 'mongoose';
export interface InterviewModel {
  // id của công việc
  jobId: string
  date: string
  time: string
  type: string
  submitted: string
  interviewer: string
}
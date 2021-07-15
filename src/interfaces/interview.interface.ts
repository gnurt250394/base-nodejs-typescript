import { Model, Schema } from 'mongoose';
export interface Interview {
  // id của công việc
  jobId: string;
  date: string;
  time: string;
  type: string;
  submitted: string;
  interviewer: string;
}

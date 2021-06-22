import { JobModel } from '@/interfaces/jobs.interface';
import { model, Schema, Document } from 'mongoose';
const jobsSchema = new Schema(
  {
    //tên công việc
    name: {
      type: String,
      required: true,
    },
    // id của công ty
    partnerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
    // địa chỉ
    address: {
      required: true,
      type: String,
    },
    // mức lương
    fromPrice: {
      required: true,
      type: Number,
    },
    // mức lương
    toPrice: {
      required: true,
      type: Number,
    },
    // mảng lĩnh vực
    fieldId: {
      required: true,
      type: [Schema.Types.ObjectId],
      maxlength: 3,
    },
    // trình độ
    level: {
      required: true,
      type: String,
    },

    deadline: {
      type: String,
      required: true,
    },
    timeStart: {
      type: String,
      required: true,
    },
    timeEnd: {
      type: String,
      required: true,
    },
    // mô tả công việc
    description: {
      type: String,
      maxlength: 1000,
    },
    // yêu cầu với ứng viên
    candidateRequest: {
      type: String,
      maxlength: 1000,
    },
    // quyền lợi
    interest: {
      type: String,
      maxlength: 1000,
    },
    active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "jobs",
    autoIndex: false,
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  }
);

// myDB.collection("jobs").createIndex({ location: "2dsphere" });
const jobs = model<JobModel & Document>("jobs", jobsSchema);
export default jobs;

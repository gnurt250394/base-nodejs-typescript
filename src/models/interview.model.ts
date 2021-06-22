import { InterviewModel } from '@/interfaces/interview.interface';
import { model, Schema, Document } from 'mongoose';
const interviewerSchema = new Schema(
  {
    // id của công việc
    jobId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    date: {
      type: String,
    },
    time: {
      type: String,
    },
    type: {
      type: String,
      // default: strings.type.CREATED,
    },
    submitted: {
      type: Schema.Types.ObjectId,
    },
    interviewer: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    collection: "interview",
    autoIndex: false,
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  }
);

const Interview = model<InterviewModel & Document>("interview", interviewerSchema);
export default Interview;

import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
const bcrypt = require("bcrypt-nodejs");

const userSchema: Schema = new Schema({
  accessToken: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  dob: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  phone: {
    type: String || Number,
    minlength: 10,
    maxlength: 11,
    default: null,
    required: true,
  },
  gender: {
    type: Number,
    default: null, //1 nam,0 nữ
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  // location: {
  //   type: { type: String, default: "Point" },
  //   coordinates: { type: [Number] },
  // },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: 'user',
  },
  address: {
    type: String,
    default: null,
  },
  province_id: {
    type: String,
    default: null,
  },
  commune_id: {
    type: String,
    default: null,
  },
  district_id: {
    type: String,
    default: null,
  },
  // giới thiệu bản thân
  overview: {
    type: String,
    default: null,
  },
  // trình độ
  level: {
    type: String,
    default: null,
  },
  // kỹ năng
  skill: {
    type: String,
    default: null,
  },
  //kinh nghiệm làm việc
  experience: {
    type: String,
    default: null,
  },
  active: {
    type: Boolean,
    default: false,
  },
},
  {
    collection: "medical_record",
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  });
/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user: any = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err: any, salt: any) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err: any, hash: any) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});
const userModel = model<User & Document>('medical_record', userSchema);

export default userModel;

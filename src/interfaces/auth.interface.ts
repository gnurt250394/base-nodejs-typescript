import { Request } from 'express';
import { User } from '@interfaces/users.interface';
import { IncomingHttpHeaders } from 'http';
import { BaseParams } from './base.interface';
import { RoleType } from '@/common/Constants';
export interface DataStoredInToken {
  _id: string;
  role: RoleType;
}
export type UserRequest = { userId: string; role: RoleType };

export interface TokenData {
  token: string;
  expiresIn: number;
  refreshToken: string;
}
export interface HeaderData extends IncomingHttpHeaders {
  role: RoleType;
}

export interface RequestWithUser extends Request {
  user: UserRequest;
}

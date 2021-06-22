import { Request } from 'express';
import { RoleType, User } from '@interfaces/users.interface';
import { IncomingHttpHeaders } from 'http';
export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
export interface HeaderData extends IncomingHttpHeaders {
  role: RoleType

}

export interface RequestWithUser extends Request {
  user: User;

  headers: HeaderData
}

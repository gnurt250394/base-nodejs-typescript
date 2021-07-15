import { Body, Controller, Post, Request, Response, Route, Tags, Header, Config, ValidationService,ValidateParam, } from 'tsoa';
export type TypeObjectId<T> = string | { type: T }; // allows accidental string assignment
// export type TypeObjectId<T> = string & { type: T }; // let the string assingment fail

export const ObjectId = <T>(input: unknown): TypeObjectId<T> => {
	return input as TypeObjectId<T>;
}
export class AuthDto {
  /**
   * @pattern (84|0[3|5|7|8|9])+([0-9]{8})\b
   * @name (abc)
   */
  phone: string;
  password: string;
  accessToken?: string;
  longitude?: number;
  latitude?: number;
  address?: string;
}
export class ForgotPasswordDto {
  /**
   * @pattern (84|0[3|5|7|8|9])+([0-9]{8})\b
   * @name (abc)
   */
  phone: string;
  password: string;
  accessToken?: string;
  longitude?: number;
  latitude?: number;
  address?: string;
}

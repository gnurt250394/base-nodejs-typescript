import { Request } from 'express';

import constants from '@configs/constants';
import { ApiError } from '@exceptions/ErrorHandler';
import config from 'config';
import jwt from 'jsonwebtoken';
import { DataStoredInToken, RequestWithUser, UserRequest } from '@interfaces/auth.interface';
import { RoleType } from './common/Constants';

export async function expressAuthentication(request: Request, securityName: string, scopes?: string[]): Promise<UserRequest> {
  switch (securityName) {
    case 'admin':
      const { authorization } = request.headers;
      console.log('authorization: ', authorization);
      try {
        const Authorization = request.cookies['Authorization'] || request.header('Authorization') || null;
        console.log('Authorization: ', Authorization);

        if (Authorization) {
          const secretKey = constants.secretKey;
          const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
          const userId = verificationResponse._id;
          const role = verificationResponse.role;

          if (userId) {
            return { userId, role };
          } else {
            throw new ApiError(constants.errorTypes.auth);
          }
        } else {
          throw new ApiError(constants.errorTypes.auth);
        }
      } catch (error) {
        console.log('error: ', error);
        throw new ApiError(constants.errorTypes.auth);
      }
  }
  throw new ApiError(constants.errorTypes.auth);
}

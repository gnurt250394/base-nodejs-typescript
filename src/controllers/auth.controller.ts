import { NextFunction, Request, Response, } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { role } = req.headers
      const signUpUserData: User = await this.authService.signup(userData, role);

      res.status(201).json(signUpUserData);
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { role } = req.headers
      const { cookie, response } = await this.authService.login(userData, role);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json(response);
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const { role } = req.headers
      const logOutUserData: User = await this.authService.logout(userData, role);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json(logOutUserData);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

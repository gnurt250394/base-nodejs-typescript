import { RoleType } from '@/common/Constants';
import { AuthDto } from '@/dtos/auth.dto';
import { inject, ProvideSingleton } from '@/ioc';
import { IUserModel } from '@/models/user.model';
import { UserService } from '@/services/user.service';
import { Body, Controller, Header, Post, Response, Route, Tags } from 'tsoa';
interface ValidateErrorJSON {
  message: 'Validation failed';
  details: { [name: string]: unknown };
}
@Tags('auth')
@Route('auth')
@ProvideSingleton(AuthController)
export class AuthController extends Controller {
  constructor(@inject(UserService) private service: UserService) {
    super();
  }

  @Response(400, 'Bad request')
  @Post('login')
  public async login(@Body() body: AuthDto, @Header() role: RoleType): Promise<IUserModel> {
    let user = await this.service.login(body, role);
    return user;
  }

  @Response<ValidateErrorJSON>(400, 'Validation Failed')
  @Post('register')
  public async signup(@Body() body: AuthDto, @Header() role: RoleType): Promise<IUserModel> {
    let user = await this.service.signup(body, role);
    console.log('user: ', user);
    return user;
  }

  @Response<ValidateErrorJSON>(400, 'Validation Failed')
  @Post('forgot-password')
  public async forgotPassword(@Body() body: AuthDto, @Header() role: RoleType): Promise<IUserModel> {
    let user = await this.service.forgotPassword(body, role);
    console.log('user: ', user);
    return user;
  }
}

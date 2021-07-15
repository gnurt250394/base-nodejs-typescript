import { RequestWithUser } from '@/interfaces/auth.interface';
import { inject, ProvideSingleton } from '@/ioc';
import { IPaginationModel } from '@/models/pagination.model';
import { IUserModel } from '@/models/user.model';
import { UserService } from '@/services/user.service';
import { Body, Controller, Delete, Get, Post, Put, Query, Request, Response, Route, Security, Tags } from 'tsoa';


@Tags('medical-record')
@Route('medical-record')
@ProvideSingleton(UserController)
export class UserController extends Controller {
  constructor(@inject(UserService) private service: UserService) {
    super();
  }

  @Get('detail')
  @Security('admin')
  public async getById(@Request() req: RequestWithUser): Promise<IUserModel> {
    const { userId, role } = req.user;
    return this.service.getDetail(userId, role);
  }

  @Get('list-medical-record')
  public async getPaginated(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('fields') fields?: string,
    @Query('sort') sort?: string,
    @Query('q') q?: string,
  ): Promise<IPaginationModel> {
    return this.service.getPaginated(page, limit, fields, sort, q);
  }

  @Response(400, 'Bad request')
  @Security('admin')
  @Post()
  public async create(@Body() body: IUserModel): Promise<IUserModel> {
    return this.service.create(body);
  }

  @Response(400, 'Bad request')
  @Security('admin')
  @Put('{id}')
  public async update(id: string, @Body() body: IUserModel): Promise<IUserModel> {
    return this.service.update(id, body);
  }

  @Security('admin')
  @Delete('{id}')
  public async delete(id: string): Promise<void> {
    return this.service.delete(id);
  }
}

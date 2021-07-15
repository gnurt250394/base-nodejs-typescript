import { inject, ProvideSingleton } from '@/ioc';
import { IPaginationModel } from '@/models/pagination.model';
import { CommuneService } from '@/services/commune.service';
import { ICommuneModel } from '@models/commune.model';
import { Controller, Get, Query, Route, Tags } from 'tsoa';

@Tags('address')
@Route('address')
@ProvideSingleton(CommuneController)
export class CommuneController extends Controller {
  constructor(@inject(CommuneService) private service: CommuneService) {
    super();
  }
  @Get('commune/detail/{id}')
  public async getById(id: string): Promise<ICommuneModel> {
    return this.service.getById(id);
  }

  @Get('commune/{id}')
  public async getPaginated(
    id: string,
    @Query('page') page: number,
    @Query('size') limit: number,
    @Query('fields') fields?: string,
    @Query('sort') sort?: string,
  ): Promise<IPaginationModel> {
    return this.service.getPaginated(page, limit, fields, sort, { id_district: id });
  }
}

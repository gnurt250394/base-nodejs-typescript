import { inject, ProvideSingleton } from '@/ioc';
import { IPaginationModel } from '@/models/pagination.model';
import { IProvinceModel } from '@/models/province.model';
import { ProvinceService } from '@/services/province.service';
import { Controller, Get, Query, Route, Tags } from 'tsoa';

@Tags('address')
@Route('address')
@ProvideSingleton(ProvinceController)
export class ProvinceController extends Controller {
  constructor(@inject(ProvinceService) private service: ProvinceService) {
    super();
  }
  @Get('province/detail/{id}')
  public async getById(id: string): Promise<IProvinceModel> {
    return this.service.getById(id);
  }

  @Get('province')
  public async getPaginated(
    @Query('page') page: number,
    @Query('size') limit: number,
    @Query('fields') fields?: string,
    @Query('sort') sort?: string,
  ): Promise<IPaginationModel> {
    return this.service.getPaginated(page, limit, fields, sort);
  }
}

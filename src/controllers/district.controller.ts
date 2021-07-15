import { inject, ProvideSingleton } from '@/ioc';
import { IDistrictModel } from '@/models/district.model';
import { IPaginationModel } from '@/models/pagination.model';
import { DistrictService } from '@/services/district.service';
import { Controller, Get, Query, Route, Tags } from 'tsoa';

@Tags('address')
@Route('address')
@ProvideSingleton(DistrictController)
export class DistrictController extends Controller {
  constructor(@inject(DistrictService) private service: DistrictService) {
    super();
  }
  @Get('district/detail/{id}')
  public async getById(id: string): Promise<IDistrictModel> {
    return this.service.getById(id);
  }

  @Get('district/{id}')
  public async getPaginated(
    id: string,
    @Query('page') page: number,
    @Query('size') limit: number,
    @Query('fields') fields?: string,
    @Query('sort') sort?: string,
  ): Promise<IPaginationModel> {
    return this.service.getPaginated(page, limit, fields, sort, { id_city: id });
  }
}

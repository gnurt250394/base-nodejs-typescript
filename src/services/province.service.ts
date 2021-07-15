import { inject, ProvideSingleton } from '@/ioc';
import { IProvinceModel } from '@/models/province.model';
import { ProvinceRepository } from '@/repositories/mongo/province.repository';
import { BaseService } from '@services/BaseService';
@ProvideSingleton(ProvinceService)
export class ProvinceService extends BaseService<IProvinceModel> {
  constructor(@inject(ProvinceRepository) protected repository: ProvinceRepository) {
    super();
  }
}

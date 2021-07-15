import { inject, ProvideSingleton } from '@/ioc';
import { IDistrictModel } from '@/models/district.model';
import { DistrictRepository } from '@repositories/mongo/district.repository';
import { BaseService } from '@services/BaseService';
@ProvideSingleton(DistrictService)
export class DistrictService extends BaseService<IDistrictModel> {
  constructor(@inject(DistrictRepository) protected repository: DistrictRepository) {
    super();
  }
}

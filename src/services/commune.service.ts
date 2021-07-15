import { inject, ProvideSingleton } from '@/ioc';
import { ICommuneModel } from '@/models/commune.model';
import { CommuneRepository } from '@repositories/mongo/commune.repository';
import { BaseService } from '@services/BaseService';
@ProvideSingleton(CommuneService)
export class CommuneService extends BaseService<ICommuneModel> {
  constructor(@inject(CommuneRepository) protected repository: CommuneRepository) {
    super();
  }
}

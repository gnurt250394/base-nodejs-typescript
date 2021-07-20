import { UserFormatter } from '@models/user.model';
import { ProvideSingleton, inject } from '@/ioc';
import { IUserModel } from '@/models/user.model';
import { BaseRepository } from './BaseRepository';
import { UserEntity } from './entities';

@ProvideSingleton(UserRepository)
export class UserRepository extends BaseRepository<IUserModel> {
  protected formatter: any = UserFormatter;

  constructor(protected entityModel: UserEntity) {
    super();
  }

  /** for aditional logic (maybe nested entities) */
  public async create(model: IUserModel, include = this.saveInclude): Promise<IUserModel> {
    return super.create(model, include);
  }

  /** for aditional logic (maybe nested entities) */
  public async update(_id: string, model: IUserModel): Promise<void> {
    return super.update(_id, model);
  }
}

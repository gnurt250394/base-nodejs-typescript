export interface IBaseRepository<EntityType> {
  create(model: EntityType): Promise<EntityType>;
  update(_id: string, model: EntityType): Promise<void>;
  delete(_id: string): Promise<{ ok?: number; n?: number } & { deletedCount?: number }>;
  find(skip?: number, limit?: number, sort?: string, query?: any): Promise<EntityType[]>;
  findOne<T>(query: any): Promise<EntityType>;
  count(query: any): Promise<number>;
  exists(query: any): Promise<boolean>;
}

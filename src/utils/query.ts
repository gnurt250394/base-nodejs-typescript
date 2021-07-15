import { ConnectionName } from '@/common/Constants';
import { BaseResponse } from '@/interfaces/base.interface';
import { connection } from 'mongoose';
class Query {
  public async getQuery<T>(
    collectionName: ConnectionName,
    query?: object,
    page: number = 0,
    limit: number = 10,
    sort?: object,
  ): Promise<BaseResponse<T[]>> {
    try {
      let db = connection.db;
      const cursor = await db
        .collection(collectionName)
        .find(query)
        .project({ password: 0 })
        .sort({ name: 1, ...sort })
        .skip(Number(page) * limit)
        .limit(Number(limit));

      return {
        data: await cursor.toArray(),
        total: await cursor.count(), // this will give count of all the documents before .skip() and limit()
        currentPage: page,
      };
    } catch (error) {
      console.log('error: ', error);
      return null;
    }
  }
  public async aggregateQuery(collectionName: ConnectionName, query?: object[], page: number = 0, limit: number = 10) {
    try {
      let db = connection.db;
      const cursor = await db
        .collection(collectionName)
        .aggregate(query)
        .skip(Number(page) * limit)
        .limit(Number(limit));

      return {
        data: await cursor.toArray(),
        total: await db.collection(collectionName).countDocuments(), // this will give count of all the documents before .skip() and limit()
        currentPage: page,
      };
    } catch (error) {
      console.log('error: ', error);
      return null;
    }
  }
}
export default Query;

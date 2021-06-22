import config from 'config';
import { dbConfig } from '@interfaces/db.interface';

const { host, port, database, url }: dbConfig = config.get('dbConfig');

export const dbConnection = {
  // url: `mongodb://${host}:${port}/${database}`,
  url,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "user",
  },
};

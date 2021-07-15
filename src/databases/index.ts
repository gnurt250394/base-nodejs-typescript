// import config from 'config';
// // import { dbConfig } from '@interfaces/db.interface';
// import Agenda from 'agenda';

// // const { host, port, database, url, agendaPoolTime }: dbConfig = config.get('dbConfig');

// export const dbConnection = {
//   // url: `mongodb://${host}:${port}/${database}`,
//   url,
//   options: {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'user',
//   },
// };

// export const agendaConnection = ({ mongoConnection }) => {
//   return new Agenda({
//     mongo: mongoConnection,
//     db: { collection: 'jobs', address: '' },
//     processEvery: agendaPoolTime,
//     // maxConcurrency: config.agenda.concurrency,
//   });
//   /**
//    * This voodoo magic is proper from agenda.js so I'm not gonna explain too much here.
//    * https://github.com/agenda/agenda#mongomongoclientinstance
//    */
// };

import { RegisterRoutes } from '@/routes';
import constants from '@configs/constants';
import handlePreRequestMiddleware from '@middlewares/error.middleware';
import { Logger, stream } from '@utils/logger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import admin from 'firebase-admin';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { SQLSetupHelper } from './configs/SQLSetupHelper';
import { ErrorHandler } from './exceptions/ErrorHandler';
import { iocContainer } from './ioc';
interface ValidateErrorJSON {
  message: 'Validation failed';
  details: { [name: string]: unknown };
}
class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor() {
    this.app = express();
    this.port = 8769;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeFirebase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
    this.initializeErrorHandling();
  }
  private initializeFirebase() {
    try {
      const serviceAccount = require('@configs/notification/keys/serviceAccountKey.json');

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: constants.firebaseUrl,
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  public async listen() {
    process.on('uncaughtException', this.criticalErrorHandler);
    process.on('unhandledRejection', this.criticalErrorHandler);
    const sqlHelper = iocContainer.get<SQLSetupHelper>(SQLSetupHelper);
    await sqlHelper.sync({ force: false });
    this.app.listen(this.port, () => {
      Logger.info(`=================================`);
      Logger.info(`======= ENV: ${this.env} =======`);
      Logger.info(`🚀 App listening on the port ${this.port}`);
      Logger.info(`=================================`);
    });
  }
  private criticalErrorHandler(...args) {
    Logger.error('Critical Error...', ...args);
    process.exit(1);
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(constants.upload, express.static('uploads'));
  }

  private initializeRoutes() {
    try {
      this.app.use(handlePreRequestMiddleware);
      RegisterRoutes(this.app);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  private initializeSwagger() {
    this.app.use(express.static('public'));
    // const swaggerDocument = require('../build/swagger/swagger.yaml');
    // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // this.app.use('/api-docs', express.static(__dirname + '/swagger-ui'));
    // this.app.use('/swagger.yaml', (req, res) => {
    //   res.sendFile(__dirname + '/swagger.yaml');
    // });
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: '/swagger.yaml',
        },
      }),
    );
  }

  private initializeErrorHandling() {
    this.app.use(ErrorHandler.handleError);
  }
}

export default App;

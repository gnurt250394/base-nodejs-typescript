process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from '@databases';
import Routes from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url, dbConnection.options).then(response=>{
      logger.info(`=================connected db================`);

    }).catch(error=>{
      logger.error(`=================error connect db================: ${error}`);

    })
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
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api/v1/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: "JAY API",
          description: "This is a sample Post API",
          version: '1.0.0'
        },
        // openapi: '3.0.0',
        // Like the one described here: https://swagger.io/specification/#infoObject
        contact: {
          name: "Gnurt",
          url: "http://www.swagger.io/support",
          email: "gnurt250394@gmail.com",
        },
        basePath: "/api/v1",
        tags: [
          {
            name: "medical-record",
            description: "API for medical-record in the system",
          },
          {
            name: "jobs",
            description: "API for jobs in the system",
          },
          {
            name: "address",
            description: "API for address in the system",
          },
          {
            name: "auth",
            description: "API for auth in the system",
          },
          {
            name: "fields",
            description: "API for fields in the system",
          },
        ],
        securityDefinitions: {
          Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
          },
        },
        servers: [
          {
            url: "http://localhost:8769",
            description:
              "Optional server description, e.g. Internal staging server for testing",
          },
          {
            url: "http://13.115.114.254:8769",
            description:
              "Optional server description, e.g. Main (production) server",
          },
        ],
      },
      apis: ['swagger.yaml'],
    }

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;

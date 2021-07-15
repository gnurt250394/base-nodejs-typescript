import { Logger } from '@utils/logger';
import { NextFunction, Request, Response } from 'express';

const handlePreRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, query, params, headers } = req;
    if (Object.keys(headers)?.length) {
      Logger.info('HEADER-CONTENT: ', headers);
    }
    if (Object.keys(body)?.length) {
      Logger.info('BODY-CONTENT: ', body);
    }
    if (Object.keys(query)?.length) {
      Logger.info('QUERY-CONTENT: ', query);
    }
    if (Object.keys(params)?.length) {
      Logger.info('PARAMS-CONTENT: ', params);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default handlePreRequestMiddleware;

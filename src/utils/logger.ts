import constants from '@/configs/constants';
import fs from 'fs';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

// logs dir
const logDir = __dirname + '/../logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] [${level}]: ${message}`);
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});
class Logger {
  public static readonly shouldLog: boolean = constants.environment !== 'test';
  public static readonly console = logger;

  public static log(...args: any[]): void {
    if (Logger.shouldLog) Logger.console.debug(Logger.formatArgs(args));
  }

  public static warn(...args: any[]): void {
    if (Logger.shouldLog) Logger.console.warn(Logger.formatArgs(args));
  }

  public static error(...args: any[]): void {
    if (Logger.shouldLog) Logger.console.error(Logger.formatArgs(args));
  }

  public static info(...args: any[]): void {
    if (Logger.shouldLog) Logger.console.info(Logger.formatArgs(args));
  }

  public static verbose(...args: any[]): void {
    if (Logger.shouldLog) Logger.console.verbose(Logger.formatArgs(args));
  }

  private static formatArgs(args: any[]): string {
    if (args.length <= 1) args = args[0];
    return JSON.stringify(args, null, 4);
  }
}
logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

const stream = {
  write: (chunk: string) => {
    logger.info(chunk.substring(0, chunk.lastIndexOf('\n')));
  },
};

export { Logger, stream };

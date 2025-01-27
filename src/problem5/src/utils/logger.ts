import { format, createLogger, transports, type Logger as LoggerType } from "winston";
import { resolve } from "path";

const logFolderPath = process.env["LOG_FOLDER_PATH"] ?? "./logs";
const maxLogSize = parseInt(process.env["LOG_FILE_MAX_SIZE"] ?? "10485760");

const customLevels = {
  error: 0,
  warning: 1,
  info: 2,
  success: 3,
};

const timestampFormat = format.timestamp({
  format: "DD-MMM-YYYY HH:mm:ss.SSS",
});

const simpleOutputFormat = format.printf((log) => {
  return `${log["timestamp"]}\t${log.level}: ${log.message}`;
});

const fileFormat = format.combine(timestampFormat, simpleOutputFormat);

const logger = createLogger({
  levels: customLevels,
  transports: [
    new transports.File({
      level: "error",
      filename: resolve(logFolderPath, "error.log"),
      maxsize: maxLogSize,
      format: fileFormat,
    }),
    new transports.File({
      level: "success",
      filename: resolve(logFolderPath, "combined.log"),
      maxsize: maxLogSize,
      format: fileFormat,
    }),
    new transports.Console({
      level: "success",
      handleExceptions: true,
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: resolve(logFolderPath, "exceptions.log"),
      format: fileFormat,
    }),
  ],
});

const Logger = {
  error: (message: string): LoggerType => logger.error(message),
  warning: (message: string): LoggerType => logger.warning(message),
  info: (message: string): LoggerType => logger.info(message),
  success: (message: string): LoggerType => logger.log("success", message),
};

export default Logger;

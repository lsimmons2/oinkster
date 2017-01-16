
import winston from 'winston'
import fs from 'fs'
import 'winston-daily-rotate-file'
import config from 'winston/lib/winston/config'
import util from 'util'

const tsFormat = () => (new Date()).toLocaleTimeString();
const env = process.env.NODE_ENV || 'dev';
const logDir = `logs/${env}/`;



if(!fs.existsSync(logDir)){
  fs.mkdirSync(logDir);
}


const infoFileLog = new winston.transports.DailyRotateFile({
  name: 'infoFileLog',
  level: 'info',
  filename: logDir + 'info.log',
  timestamp: tsFormat,
  prepend: true,
  stringify: (data) => JSON.stringify(data, null, 2)
})


const errorFileLog = new winston.transports.DailyRotateFile({
  name: 'errorFileLog',
  level: 'error',
  filename: logDir + 'error.log',
  timestamp: tsFormat,
  prepend: true,
  stringify: (data) => JSON.stringify(data, null, 2)
})


const consoleLogFormat = (options) => {
  let consoleMessage = '';
  consoleMessage += config.colorize(options.level,options.level.toUpperCase()) + '\n';
  consoleMessage += options.timestamp() + ' - ';
  consoleMessage += options.message ? options.message + '\n' : '\n';
  consoleMessage += (options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta, null, 2) : '' );
  return consoleMessage;
}


const consoleLog = new (winston.transports.Console)({
  timestamp: tsFormat,
  silent: env !== 'dev',
  formatter: consoleLogFormat
})


const logger = new (winston.Logger)({
  transports: [
    infoFileLog,
    errorFileLog,
    consoleLog
  ]
})


export default logger

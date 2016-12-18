
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


const dbInfoFileLog = new winston.transports.DailyRotateFile({
  name: 'dbInfoFileLog',
  level: 'info',
  filename: logDir + 'info.log',
  timestamp: tsFormat,
  prepend: true,
  stringify: (data) => JSON.stringify(data, null, 2)
})


const dbErrorFileLog = new winston.transports.DailyRotateFile({
  name: 'dbErrorFileLog',
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


const dbConsoleLog = new (winston.transports.Console)({
  timestamp: tsFormat,
  silent: env !== 'dev',
  formatter: consoleLogFormat
})


const dbLogger = new (winston.Logger)({
  transports: [
    dbInfoFileLog,
    dbErrorFileLog,
    dbConsoleLog
  ]
})


export default dbLogger

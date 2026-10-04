import * as log4js from 'log4js';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigReader } from './configReader';

type LevelName = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

let configured = false;

/* Sets log4js up once: the file gets every level, the console follows LOG_LEVEL. */
function configure(): void {
  if (configured) {
    return;
  }
  const logFile = path.resolve(__dirname, '..', ConfigReader.logFile);
  fs.mkdirSync(path.dirname(logFile), { recursive: true });

  log4js.configure({
    appenders: {
      file: { type: 'file', filename: logFile, layout: { type: 'messagePassThrough' } },
      consoleRaw: { type: 'stdout', layout: { type: 'messagePassThrough' } },
      console: { type: 'logLevelFilter', appender: 'consoleRaw', level: ConfigReader.logLevel },
    },
    categories: { default: { appenders: ['file', 'console'], level: 'trace' } },
  });
  configured = true;
}

/* yyyy.MM.dd.HH.mm.ss */
function timestamp(): string {
  const d = new Date();
  const p = (n: number): string => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}.${p(d.getHours())}.${p(d.getMinutes())}.${p(d.getSeconds())}`;
}

/* Writes lines like: [INFO] 2026.10.04.12.30.45 HomePage.open Opened the front page */
export class AppLogger {
  private readonly logger: log4js.Logger;
  private readonly className: string;

  constructor(className: string) {
    configure();
    this.className = className;
    this.logger = log4js.getLogger(className);
  }

  private write(level: LevelName, method: string, message: string): void {
    this.logger[level](`[${level.toUpperCase()}] ${timestamp()} ${this.className}.${method} ${message}`);
  }

  trace(method: string, message: string): void {
    this.write('trace', method, message);
  }

  debug(method: string, message: string): void {
    this.write('debug', method, message);
  }

  info(method: string, message: string): void {
    this.write('info', method, message);
  }

  warn(method: string, message: string): void {
    this.write('warn', method, message);
  }

  error(method: string, message: string): void {
    this.write('error', method, message);
  }

  fatal(method: string, message: string): void {
    this.write('fatal', method, message);
  }
}

export function getLogger(className: string): AppLogger {
  return new AppLogger(className);
}

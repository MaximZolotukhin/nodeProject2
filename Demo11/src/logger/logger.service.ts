import { Logger, ILogObj } from 'tslog'
import { ILogger } from './logger.interface.js'

export class LoggerService implements ILogger {
  public logger: Logger<ILogObj>

  constructor() {
    const loggerTemplate = '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}: '

    this.logger = new Logger({
      prettyLogTemplate: loggerTemplate,
    })
  }

  log(...args: unknown[]) {
    this.logger.info(...args)
  }

  error(...args: unknown[]) {
    // отправка в sentry / rollbar
    this.logger.error(...args)
  }

  warn(...args: unknown[]) {
    // отправка в sentry / rollbar
    this.logger.warn(...args)
  }
}

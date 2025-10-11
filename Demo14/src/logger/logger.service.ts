import { Logger, ILogObj } from "tslog";
import { ILogger } from "./logger.interface.js";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable() // Говорит что класс который мы задекарировали можно положить в контейнер
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;

	constructor() {
		const loggerTemplate = "{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}: ";

		this.logger = new Logger({
			prettyLogTemplate: loggerTemplate,
		});
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		// отправка в sentry / rollbar
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		// отправка в sentry / rollbar
		this.logger.warn(...args);
	}
}

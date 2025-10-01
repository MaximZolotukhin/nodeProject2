// Точка входа в приложение
import { Container, ContainerModule } from "inversify";
import { App } from "./app.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { LoggerService } from "./logger/logger.service.js";
import { UserController } from "./users/users.controller.js";
import { ILogger } from "./logger/logger.interface.js";
import { TYPES } from "./types.js";
import { IExeptionFilter } from "./errors/exeption.filter.interface.js";

export interface BootsrapReturn {
	appContainer: Container;
	app: App;
}

// Правильный способ DI
// Создаем контейнер модуль
export const appBindings = new ContainerModule((bind) => {
	bind.bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind.bind<UserController>(TYPES.UserController).to(UserController);
	bind.bind<App>(TYPES.Application).to(App);
});

function bootstrap(): BootsrapReturn {
	// Создание контейнеров и привязка к TYPES
	const appContainer = new Container();
	// Загружаем наши биндинги
	appContainer.load(appBindings);
	// Созадание экземпляра App
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();

// Точка входа в приложение
import { Container, ContainerModule } from "inversify";
import { App } from "./app.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { LoggerService } from "./logger/logger.service.js";
import { UserController } from "./users/users.controller.js";
import { ILogger } from "./logger/logger.interface.js";
import { TYPES } from "./types.js";
import { IExeptionFilter } from "./errors/exeption.filter.interface.js";
import { UserService } from "./users/users.services.js";
import { IUserService } from "./users/users.services.interface.js";
import { IUserController } from "./users/users.controller.interface.js";
import { IConfigService } from "./config/config.service.interface.js";
import { ConfigService } from "./config/confing.service.js";
import { PrismaService } from "../database/prisma.service.js";

export interface BootsrapReturn {
	appContainer: Container;
	app: App;
}

// Правильный способ DI
// Создаем контейнер модуль
export const appBindings = new ContainerModule((bind) => {
	bind.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind.bind<IUserController>(TYPES.UserController).to(UserController);
	bind.bind<IUserService>(TYPES.UserService).to(UserService);
	bind.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
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

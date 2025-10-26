import express, { Express } from "express";
import { Server } from "http";
import { ILogger } from "./logger/logger.interface.js";
import { TYPES } from "./types.js";
import { inject } from "inversify";
import "reflect-metadata";
import { IConfigService } from "./config/config.service.interface.js";
import { IUserController } from "./users/users.controller.interface.js";
import { IExeptionFilter } from "./errors/exeption.filter.interface.js";
import { UserController } from "./users/users.controller.js";
import { PrismaService } from "../database/prisma.service.js";
import { AuthMiddleware } from "./common/auth.middleware.js";

export class App {
	app: Express; // Инстанц класса express
	server: Server;
	port: number; // Порт

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(express.json()); // ← заменяет body-parser.json()
		// this.app.use(express.urlencoded({ extended: true })); // ← заменяет body-parser.urlencoded()
		const authMiddleware = new AuthMiddleware(this.configService.get("SECRET"));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	userRoutes(): void {
		this.app.use("/users", this.userController.router);
	}

	//Обработка ошибок
	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		// Подключаем middleware
		this.useMiddleware();
		//Инициализируем Роуты
		this.userRoutes();
		//Инициализация Фильтра для обработки ошибок
		this.useExeptionFilters();
		// Подключаемся к базе данных
		await this.prismaService.connect();
		//Запускаем сервер
		this.server = this.app.listen(this.port);
		this.logger.log(`Server start on http://localhost:${this.port}`);
	}
}

import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './users/users.controller.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { ILogger } from './logger/logger.interface.js';
import { TYPES } from './types.js';
import { LoggerService } from './logger/logger.service.js';
import { inject } from 'inversify';
import 'reflect-metadata';

export class App {
	app: Express; // Инстанц класса express
	server: Server;
	port: number; // Порт

	constructor(
		@inject(TYPES.ILogger) private logger: LoggerService,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	userRoutes() {
		this.app.use('/users', this.userController.router);
	}

	//Обработка ошибок
	useExeptionFilters() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init() {
		//Инициализируем Роуты
		this.userRoutes();
		//Инициализация Фильтра для обработки ошибок
		this.useExeptionFilters();
		//Запускаем сервер
		this.server = this.app.listen(this.port);
		this.logger.log(`Server start on http://localhost:${this.port}`);
	}
}

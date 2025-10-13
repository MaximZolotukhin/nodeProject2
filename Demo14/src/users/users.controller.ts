import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller.js";
import { LoggerService } from "../logger/logger.service.js";
import { HTTPError } from "../errors/http-error.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import "reflect-metadata";
import { IUserController } from "./users.controller.interface.js";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-register.dto.js";
import { User } from "./user.entity.js";
import { ILogger } from "../logger/logger.interface.js";
import { UserService } from "./users.services.js";
import { ValidateMiddleware } from "../common/validate.middleware.js";

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerService);
		// Данные брать из интерфейса
		this.bindRoutes([
			{
				path: "/register",
				method: "post",
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: "/login",
				method: "post",
				func: this.login,
			},
		]);
	}

	public login(
		req: Request<unknown, unknown, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): void {
		console.log(req.body);
		next(new HTTPError(401, "Ошибка авторизации", "login"));
	}

	async register(
		req: Request<unknown, unknown, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(req.body);
		if (!result) {
			return next(new HTTPError(422, "Такой пользователь уже существует"));
		}
		this.ok(res, { email: result.email });

		// const newUser = new User(req.body.email, req.body.name);
		// await newUser.setPassword(req.body.password);
		// this.ok(res, newUser);
	}
}

import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller.js";
import { HTTPError } from "../errors/http-error.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import "reflect-metadata";
import { IUserController } from "./users.controller.interface.js";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-register.dto.js";
import { ILogger } from "../logger/logger.interface.js";
import { ValidateMiddleware } from "../common/validate.middleware.js";
import { IUserService } from "./users.services.interface.js";
import { IConfigService } from "../config/config.service.interface.js";
import jsonwebtoken from "jsonwebtoken";

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
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
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: "/info",
				method: "get",
				func: this.info,
				middlewares: [],
			},
		]);
	}

	public async login(
		req: Request<unknown, unknown, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HTTPError(401, "Ошибка авторизации", "login"));
		}
		const jwt = await this.signJWT(req.body.email, this.configService.get("SECRET"));
		this.ok(res, { jwt });
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
	}

	async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, { email: req.user });
	}

	// Подключение JWT токена
	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			jsonwebtoken.sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{ algorithm: "HS256" },
				(err: Error | null, token: string | undefined) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}

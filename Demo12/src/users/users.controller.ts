import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../common/base.controller.js'
import { LoggerService } from '../logger/logger.service.js'
import { HTTPError } from '../errors/http-error.class.js'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types.js'
import 'reflect-metadata'
import { IUserController } from './user.controller.interface.js'

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: LoggerService) {
    super(loggerService)
    // Данные брать из интерфейса
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
      },
    ])
  }

  public login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, 'Ошибка авторизации'))
  }

  public register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register')
  }
}

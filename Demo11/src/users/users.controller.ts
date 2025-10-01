import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../common/base.controller.js'
import { LoggerService } from '../logger/logger.service.js'
import { HTTPError } from '../errors/http-error.class.js'

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger)
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

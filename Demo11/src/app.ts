import express, { Express } from 'express'
import { userRouter } from './users/users.js'
import { Server } from 'http'

export class App {
  app: Express // Инстанц класса express
  server: Server
  port: number // Порт

  constructor() {
    this.app = express()
    this.port = 8000
  }

  /**
   * Метод для прописывания роутов
   */
  userRoutes() {
    this.app.use('/users', userRouter)
  }

  public async init() {
    //Инициализируем Роуты
    this.userRoutes()

    //Запускаем сервер
    this.server = this.app.listen(this.port)
    console.log(`Server start on http://localhost:${this.port}`)
  }
}

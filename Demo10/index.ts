import express, { Request, Response, NextFunction } from 'express'
import { userRouter } from './user/user.js'

const port = 8000
const app = express()

app.use((req, res, next) => {
  console.log('Время ', Date.now())
  next()
}) // Работа с middleware

app.get('/hello', (req, res) => {
  res.set('Content-type', 'text/plain') // Заголовок ответа
  res.status(201).json({ message: 'Все хорошо' }) // Отправка статуса и json

  res.send('Привет!')
})

app.use('/users', userRouter) // подключение маршрутиризации

//TODO ОБРАБОТЧИК ОШИБОК
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message)
  res.status(500).send(err.message)
})

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`)
})

import express from 'express'
import { userRouter } from './user/user.js'

const port = 8000
const app = express()

// app.get.all('/hello', (req, res, next) => {
//   res.send('Привет!')
//   next()
// })

app.use((req, res, next) => {
  console.log('Время ', Date.now())
  next()
}) // Работа с middleware

app.get('/hello', (req, res) => {
  res.set('Content-type', 'text/plain') // Заголовок ответа
  // Варинат 3 передачи заголовка
  // res.append('Warning', 'code') // Присоединяет любой заголовок
  // res.type('application/json') // Изменяет тип заголовка
  res.status(201).json({ message: 'Все хорошо' }) // Отправка статуса и json
  // res.download('Путь до файла', "Имя файла") // При переходе по ссылке будет скачиватся файл
  // res.redirect('статус 301', "ссылка на сайт") // ридерект на другю страницу

  // res.cookie('Имя куки', {
  //   domain: '', // домен к которому относится куки
  //   path: '', // Путь
  //   secure: true, // Безопасный или нет
  //   expires: 60000, // Время жизни в милисекундах
  // })
  // res.clearCookie('имя куки', '/путь до куки') // очищает куки
  res.send('Привет!')
})

app.use('/users', userRouter) // подключение маршрутиризации

// В роуты можно добавлять колбэк для промежуточной обработки запроса

// const callBack = (req, res, next) => {
//   console.log('callBack')
//   next()
// }

// app.get('/hello', callBack, (req, res) => {
//   res.send('Привет!')
// }) // Или можно передать массив

// //Еще одна запись
// app
//   .route('/user')
//   .get('/hello', (req, res) => {
//     res.send('Привет!')
//   })
//   .post('/hello', (req, res) => {
//     res.send('Привет POST!')
//   })

//TODO ОБРАБОТЧИК ОШИБОК
app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(500).send(err.message)
})

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`)
})

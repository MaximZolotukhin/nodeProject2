import express from 'express'
import { getWeather, getIcon } from './service/api.service.js'

const app = express()
const PORT = 8000

app.get('/', async (req, res) => {
  const city = req.query.city
  const weather = await getWeather(city, 'ru')

  const weatherResp = `
  Погода в городе ${weather.name}
  ${getIcon(weather.weather[0].icon)}  ${weather.weather[0].description}
  Температура: ${weather.main.temp} (ощущается как ${weather.main.feels_like})
  Влажность: ${weather.main.humidity}%
  Скорость ветра: ${weather.wind.speed} м/с
  `
  res.send(weatherResp)
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})

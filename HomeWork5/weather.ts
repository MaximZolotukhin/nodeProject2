import express, { Request, Response } from 'express'
import { getWeather, getIcon } from './service/api.service.js'

const app = express()
const PORT: number = 8000

interface WeatherCity {
  city?: string | string[] // разрешаем строку или массив строк
}

app.get('/', async (req: Request<{}, {}, {}, WeatherCity>, res: Response) => {
  // const city = req.query.city ?? 'Курск'
  let city: string
  if (Array.isArray(req.query.city)) {
    city = req.query.city[0] || 'Курск'
  } else {
    city = req.query.city ?? 'Курск'
  }

  try {
    const weather = await getWeather(city, 'ru')
    const weatherResp: string = `
  Погода в городе ${weather.name}
  ${getIcon(weather.weather[0].icon)}  ${weather.weather[0].description}
  Температура: ${weather.main.temp} (ощущается как ${weather.main.feels_like})
  Влажность: ${weather.main.humidity}%
  Скорость ветра: ${weather.wind.speed} м/с
  `
    res.send(weatherResp)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      res.send(error.message)
    } else {
      console.log('Неизвестная ошибка:', error)
    }
  }
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})

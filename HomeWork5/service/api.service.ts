// import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'
import axios from 'axios'
import 'dotenv/config' // Подключение переменных окружения

const getIcon = (icon: string) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️'
    case '02':
      return '🌤️'
    case '03':
      return '☁️'
    case '04':
      return '☁️'
    case '09':
      return '🌧️'
    case '10':
      return '🌦️'
    case '11':
      return '🌩️'
    case '13':
      return '❄️'
    case '50':
      return '🌫️'
  }
}

// Типизация
const getWeather = async (city: string, language: string) => {
  const token: string | undefined = process.env.TOKEN_API
  if (!token) {
    throw new Error('Не задан ключь API, задайте его через команду -t [API_KEY]')
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: token,
        lang: language,
        units: 'metric',
      },
    })

    return response.data
  } catch (error) {
    if (error instanceof Error) {
      // Можно пробросить дальше, если нужно обработать выше
      throw new Error(`Не удалось получить погоду для ${city}: ${error.message}`)
    }
  }
}

export { getWeather, getIcon }

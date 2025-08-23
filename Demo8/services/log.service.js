import chalk from 'chalk' // Библиотека для стилизации текста в консоли
import dedent from 'dedent-js'

const printError = (error) => {
  console.log(`${chalk.bgRed(' ERROR ')} ${error}`)
}

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen(' SUCCESS ')} ${message}`)
}

const printWeather = (res, icon, language) => {
  if (language == 'ru') {
    console.log(
      dedent(`
  ${chalk.bgYellow(' SUCCSESS ')}
  ${chalk.bgYellow(' WEATHER ')} 
  Погода в городе ${res.name}
  ${icon}  ${res.weather[0].description} 
  Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
  Влажность: ${res.main.humidity}
  Скорость ветра: ${res.wind.speed}
  `)
    )
  }
  if (language == 'en') {
    console.log(
      dedent(`
  ${chalk.bgYellow(' SUCCESS ')}
  ${chalk.bgYellow(' WEATHER ')} 
  Weather in city ${res.name}
  ${icon}  ${res.weather[0].description} 
  Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
  Humidity: ${res.main.humidity}
  Wind speed: ${res.wind.speed}
  `)
    )
  }
}

const printHelp = (response, icon) => {
  console.log(
    dedent(`
  ${chalk.bgCyan(' HELP ')}
  Без параметров - вывод погоды 
  -s [CITY] для установки города
  -h для вывода помощи
  -t [API_KEY] для сохранение токена
  -l для установки языка
  `)
  )
}

export { printError, printSuccess, printHelp, printWeather }

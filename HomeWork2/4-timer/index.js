function startTimer(timeString) {
  // Разбиваем строку по пробелам
  const parts = timeString.split(' ')

  let totalSeconds = 0

  for (const part of parts) {
    if (!part) continue

    const unit = part.slice(-1) // Последний символ: h, m, s
    const value = parseInt(part, 10) // Число из начала строки

    if (isNaN(value)) {
      console.log(`Ошибка: не удалось прочитать число в "${part}"`)
      return
    }

    switch (unit) {
      case 'h':
        totalSeconds += value * 3600
        break
      case 'm':
        totalSeconds += value * 60
        break
      case 's':
        totalSeconds += value
        break
      default:
        console.log(`Неизвестная единица: ${unit}. Используйте h, m, s.`)
        return
    }
  }

  if (totalSeconds <= 0) {
    console.log('Время должно быть больше нуля.')
    return
  }

  console.log(`Таймер запущен на ${totalSeconds} секунд...`)

  setTimeout(() => {
    console.log('Работа таймера завершена')
    process.stdout.write('\x07') // Звуковой сигнал (если поддерживается)
  }, totalSeconds * 1000)
}

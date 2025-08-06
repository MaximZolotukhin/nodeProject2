function startTimer(parts) {
  // parts — это массив, например: ['1h', '30m', '45s']

  let totalSeconds = 0

  for (const part of parts) {
    if (!part || typeof part !== 'string') continue

    const unit = part.slice(-1).toLowerCase()
    const value = parseInt(part, 10)

    if (isNaN(value)) {
      console.log(`❌ Ошибка: не удалось прочитать число в "${part}"`)
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
        console.log(`⚠️ Неизвестная единица: ${unit}. Используйте h, m, s.`)
        return
    }
  }

  if (totalSeconds <= 0) {
    console.log('⏰ Время должно быть больше нуля.')
    return
  }

  console.log(`✅ Таймер запущен на ${totalSeconds} секунд...`)

  setTimeout(() => {
    console.log('🎉 Работа таймера завершена!')
    process.stdout.write('\x07')
  }, totalSeconds * 1000)
}

// Получаем аргументы
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log('Использование: node timer.js <время>\nПример: node timer.js 1h 30m 45s')
  process.exit(1)
}

// ✅ ПЕРЕДАЁМ МАССИВ НАПРЯМУЮ — БЕЗ join!
startTimer(args)

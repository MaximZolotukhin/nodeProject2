// timer.js
import notifier from 'node-notifier'
const args = process.argv.slice(2)

// Помощь
if (args.length === 0) {
  console.log('Использование: node timer.js <время>')
  console.log('Пример: node timer.js 1h 5m 10s')
  process.exit(1)
}

const input = args.join(' ')
console.log(`Установлен таймер на: ${input}`)

// Парсинг времени
const parts = input.split(' ')
let totalSeconds = 0

for (const part of parts) {
  if (!part) continue
  const unit = part.slice(-1).toLowerCase()
  const value = parseInt(part, 10)

  if (isNaN(value)) {
    console.log(`❌ Ошибка: не удалось распознать число в "${part}"`)
    process.exit(1)
  }

  if (unit === 'h') totalSeconds += value * 3600
  else if (unit === 'm') totalSeconds += value * 60
  else if (unit === 's') totalSeconds += value
  else {
    console.log(`❌ Неизвестная единица: ${unit}. Используйте h, m, s.`)
    process.exit(1)
  }
}

if (totalSeconds <= 0) {
  console.log('⏱ Время должно быть больше нуля.')
  process.exit(1)
}

console.log(`✅ Таймер запущен на ${totalSeconds} секунд...`)

// Обратный отсчёт (опционально)
let remaining = totalSeconds

const interval = setInterval(() => {
  remaining--

  // Выводим остаток каждые 5 секунд и последние 5 секунд
  if (remaining % 5 === 0 || remaining <= 5) {
    const mins = Math.floor(remaining / 60)
    const secs = remaining % 60
    console.log(`Осталось: ${mins} мин ${secs} сек`)
  }

  if (remaining <= 0) {
    clearInterval(interval)

    // Вывод в консоль
    console.log('\n⏰ Таймер завершён! Звонок окончен.')

    // Системное уведомление с звуком
    notifier.notify({
      title: 'Таймер завершён',
      message: 'Время вышло!',
      sound: true, // Включает звук (на macOS, Windows и Linux)
      wait: false, // Не ждать действия пользователя
    })

    // Дополнительно: звуковой сигнал в терминале
    process.stdout.write('\x07') // Beep
  }
}, 1000)

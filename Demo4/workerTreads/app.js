import crypto from 'crypto'
import https from 'https'

// К теме  ИЗМЕРЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ
import perf_hooks from 'perf_hooks'
const start = performance.now()

// Увeличиваем количество оперция на процессоре с 4 до 8. Максимально возможное число ядер
// process.env.UV_THREADPOOL_SIZE = 8
// console.log('JFHDSHFGAHFA')

// for (let i = 0; i < 25; i++) {
//   crypto.pbkdf2('test', 'salt', 10000, 64, 'sha512', () => {
//     console.log(start - performance.now())
//   })
// }

// РАБОТА С http запросами
// for (let i = 0; i < 25; i++) {
//   https.get('https://yandex.ru', (res) => {
//     // Событие получения данных
//     res.on('data', () => {})
//     // Событие конца обработки
//     res.on('end', () => {
//       console.log(performance.now() - start)
//     })
//   })
// }

// ИЗМЕРЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ
function slow() {
  // Ставим метку
  performance.mark('start')
  const arr = []
  for (let i = 0; i < 1000000; i++) {
    arr.push(i * i)
  }
  performance.mark('end')
  // Рассчитывает данные по переднной фукнции от двух указанных меток start и end
  performance.measure('slow', 'start', 'end')
  // console.log(performance.getEntriesByName('slow'));
}

slow()

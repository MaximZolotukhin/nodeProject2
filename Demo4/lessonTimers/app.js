// // Фиксирует время на момент запуска
// const start = performance.now()

// // Созадние таймера
// setTimeout(() => {
//   console.log(performance.now() - start)
//   console.log('Тест')
// }, 1000)

// // Вызов Таймера с перданной в него функцией
// function myFunc(arg) {
//   console.log(`Инфа ${arg}`)
// }

// setTimeout(myFunc, 1500, 'Через 1500 секунд')

// // Очистка Timeout
// const timerId = setTimeout(() => {
//   console.log('Ты не пройдешь')
// }, 5000)

// // Если закрыть этот setTimeout, то timeoutId отработает
// setTimeout(() => {
//   clearTimeout(timerId)
//   console.log('Нужны часы')
// }, 2000)

// //ЗАПУСК с определeнным интревалом
// const intervalId = setInterval(() => {
//   console.log(performance.now())
// }, 1000)

// // Остановка интервала
// setTimeout(() => {
//   clearTimeout(intervalId)
//   console.log('Горшочек не вари')
// }, 5000)

// ЗАПУСК действия после окончания всех действий
// console.log('Перед')

// setImmediate(() => {
//   console.log('После всего')
// })

// console.log('После')

// Отключение и включение таймера
const timerLink = setTimeout(() => {
  console.log('Нужны часы')
}, 2000)

//Отключение таймера
timerLink.unref()

//Включение таймера
timerLink.ref()

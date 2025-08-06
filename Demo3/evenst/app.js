// Поключаю слушатель событий
import EventEmmiter from 'events'

const myEmmiter = new EventEmmiter()

const logDbConnection = () => {
  console.log('Поключение к базе данных!')
}

// Подписка на событие .addListener(<event>, <callback>)
myEmmiter.addListener('connected', logDbConnection)
// Создаем событие
myEmmiter.emit('connected')
// Удаление события
myEmmiter.removeListener('connected', logDbConnection)
// Или варинат 2
myEmmiter.off('connected', logDbConnection)
// Удаление всех слушателей с переданного события
// myEmmiter.removeAllListeners('connected')

// Подписка на событие варинат 2
myEmmiter.on('msg', (data) => {
  console.log(`Получил: ${data}`)
})

// Запускает переданное событе раньше чем оно идет по очередеи
myEmmiter.prependListener('msg', (data) => {
  console.log(`Я первый`)
})

myEmmiter.emit('msg', 'База данных, пока не доступна')

// Команда запускает событие только одни раз за работу приложения
myEmmiter.once('onceWork', () => {
  console.log('Отработает только одни раз')
})
myEmmiter.emit('onceWork')
myEmmiter.emit('onceWork')

// Просмотр максимально числа вызовов
console.log(myEmmiter.getMaxListeners())
// Установка максимального числа вызовов
myEmmiter.setMaxListeners(1)
console.log(myEmmiter.getMaxListeners())

// Просмотр вызово для конкретного события
console.log(myEmmiter.listenerCount('msg'))
console.log(myEmmiter.listenerCount('onceWork'))

// Получение списка всех слушателей
console.log(myEmmiter.listeners('msg'))

// Получение списка с именами всех активных событий
console.log(myEmmiter.eventNames())

// Обработка ошибок
myEmmiter.on('error', (err) => {
  console.log('Ошибка', err)
})

myEmmiter.emit('error', new Error('Подкрался не заметно!'))

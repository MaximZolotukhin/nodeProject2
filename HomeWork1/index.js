// Подключение библиотек
const add = require('./add.js')
const substract = require('./substract.js')
const divide = require('./divide.js')
const multiply = require('./multiply.js')

const EventEmitter = require('events')
const emiter = new EventEmitter()

// Операция умножения вызывается через '*'
const args = process.argv.slice(2)
const a = +args[0]
const b = +args[1]
const operation = args[2]

if (Number.isFinite(a) && Number.isFinite(a)) {
  let result = undefined

  if (operation != '+' && operation != '-' && operation != '/' && operation != '*') {
    result = 'Неизвестная операция'
  }
  //Создаю события. addListener и on одно и тоже
  emiter.addListener('+', (a, b) => (result = add(a, b)))
  emiter.addListener('-', (a, b) => (result = substract(a, b)))

  emiter.on('/', (a, b) => (result = divide(a, b)))
  emiter.on('*', (a, b) => (result = multiply(a, b)))

  switch (operation) {
    case '+':
      emiter.emit(operation, a, b)
      break
    case '-':
      emiter.emit(operation, a, b)
      break
    case '*':
      emiter.emit(operation, a, b)
      break
    case '/':
      if (b != 0 && operation === '/') {
        emiter.emit(operation, a, b)
      } else {
        result = 'Деленеие на 0 запрещено'
        // return result
      }
      break
    default:
      console.log(`${operation} Не поддерживаемая операция`)
  }

  console.log(result)
} else {
  console.log('Ввели не верное количество аргуметнов')
}

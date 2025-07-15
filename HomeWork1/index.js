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

if (typeof a == 'number' && typeof b == 'number') {
  let result = undefined

  if (operation != '+' && operation != '-' && operation != '/' && operation != '*') {
    result = 'Неизвестная операция'
  }
  //Создаю события. addListener и on одно и тоже
  emiter.addListener('+', (a, b) => (result = add(a, b)))
  emiter.addListener('-', (a, b) => (result = substract(a, b)))
  if (b != 0) {
    emiter.on('/', (a, b) => (result = divide(a, b)))
  } else {
    console.log('Деленеие на 0 запрещено')
  }

  emiter.on('*', (a, b) => (result = multiply(a, b)))

  emiter.emit(operation, a, b)
  console.log(result)
} else {
  console.log('Ввели не верное количество аргуметнов')
}

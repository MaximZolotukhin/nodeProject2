// Подключение библиотек
const add = require('../add.js')
const substract = require('../substract.js')
const divide = require('../divide.js')
const multiply = require('../multyply.js')

const EventEmmiter = require('events')
const emiter = new EventEmmiter()

// Операция умножения вызывается через '*'
const args = process.argv.slice(2)
const a = +args[0]
const b = +args[1]
const operation = args[2]

let result = undefined

//Создаю события. addListener и on одно и тоже
emiter.addListener('+', (a, b) => (result = add(a, b)))
emiter.addListener('-', (a, b) => (result = substract(a, b)))
emiter.on('/', (a, b) => (result = divide(a, b)))
emiter.on('*', (a, b) => (result = multiply(a, b)))

emiter.emit(operation)
console.log(result)

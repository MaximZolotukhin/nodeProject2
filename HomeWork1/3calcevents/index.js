// Подключение библиотек
const add = require('../add.js')
const subtract = require('../subtract.js')
const divide = require('../divide.js')
const multiply = require('../multyply.js')

const EventEmmiter = require('events')
const emiter = new EventEmmiter()

// Операция умножения вызывается через '*'
const args = process.argv.slice(2)
const a = +args[0]
const b = +args[1]
const operation = args[2]

//Создаю события. addListener и on одно и тоже
emiter.addListener('add', (a, b) => (resultAdd = add(a, b)))
emiter.addListener('subtract', (a, b) => (resultSubtract = subtract(a, b)))
emiter.on('divide', (a, b) => (resultDivide = divide(a, b)))
emiter.on('multiply', (a, b) => (resultMultiply = multiply(a, b)))

switch (operation) {
  case '+':
    // Запускаяю событие
    emiter.emit('add', a, b)
    console.log(resultAdd)
    break
  case '-':
    emiter.emit('subtract', a, b)
    console.log(resultSubtract)
    break
  case '/':
    emiter.emit('divide', a, b)
    console.log(resultDivide)
    break
  case '*':
    emiter.emit('multiply', a, b)
    console.log(resultMultiply)
    break
}

const add = require('./add.js')
const substract = require('./substract.js')
const divide = require('./divide.js')
const multiply = require('./multyply.js')

const args = process.argv.slice(2)
console.log(process)
const a = +args[0]
const b = +args[1]
const operation = args[2]

function calculater(a, b, operation) {
  switch (operation) {
    case '+':
      return add(a, b)
    case '-':
      return substract(a, b)
    case '/':
      return divide(a, b)
    case '*':
      return multiply(a, b)
    default:
      console.log('Неправильный оператор')
  }
}

console.log(process.argv)

console.log(calculater(a, b, operation))

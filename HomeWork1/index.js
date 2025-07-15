const add = require('./add.js')
const subtract = require('./subtract.js')
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
      return subtract(a, b)
    case '/':
      return divide(a, b)
    case '*':
      return multiply(a, b)
  }
}

console.log(process.argv)

console.log(calculater(a, b, operation))

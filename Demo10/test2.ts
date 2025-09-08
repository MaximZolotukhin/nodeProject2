//GENERICS джинерики
function login<T>(obj: T): T {
  console.log(obj)
  return obj
}

login<string>('asd')
login<number>(12)

// Усложненный вариант
function login2<T, K>(obj: T, arr: K[]): K[] {
  console.log(obj)
  return arr
}

login2<string, number>('sd', [1])

// Вариант с наследованиме какого либо свойства или типа
interface HasLength {
  length: number
}

function login3<T extends HasLength, K>(obj: T, arr: K[]): K[] {
  console.log(obj.length) // OK
  console.log(obj)
  return arr
}

login3('sd', [1]) // компилятор выведет T = string, работает

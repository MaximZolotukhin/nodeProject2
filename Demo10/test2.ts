//GENERICS джинерики
function log<T>(obj: T): T {
  console.log(obj)
  return obj
}

log<string>('asd')
log<number>(12)

// Усложненный вариант
function log2<T, K>(obj: T, arr: K[]): K[] {
  console.log(obj)
  return arr
}

log2<string, number>('sd', [1])

// Вариант с наследованиме какого либо свойства или типа
interface HasLenght {
  lenght: number
}

function log3<T extends HasLenght, K>(obj: T, arr: K[]): K[] {
  obj.lenght // В этом случае мы можешь использовать такой вызов
  console.log(obj)
  return arr
}

log2<string, number>('sd', [1])

let a: number = 5 // числовой тип
let b: string = '5' // строковый тип

let c: number = a + Number(b)

let d = true // Булев тип

// Массивы
let names: string[] = ['sd', 'стока'] // Массив строк
let ages: number[] = [4, 6, 8] // Массив числовой

// СМЕШАННЫХ МАССИВОВ БЫТЬ НЕ МОЖЕТ!!!!

//Кортеж
let tup: [number, string] = [2, 'string']

//Функция
function greet(name: string): string {
  return name + 'Hi'
}

names.map((name: string) => name)

// Объектные типы
function coord(coord: { lat: number; long: number }) {}

//UNION TYPE
let unuversalId: string | number = 5
unuversalId = '5'

function printId(id: number | string) {
  // Проверка на тип
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}

function helloUser(user: string | string[]) {
  // Проверка на тип
  if (Array.isArray(user)) {
    console.log(user.join(', ') + 'Hi!')
  } else {
    console.log(user + 'Hi!')
  }
}

// ЛИТЕРАЛЬНЫЕ ТИПЫ
let hi: 'hi' = 'hi'

type direction = 'left' | 'right'

function moveDog(direction: direction) {
  switch (direction) {
    case 'left':
      return -1
    case 'right':
      return 1
    default:
      return 0
  }
}

// Кастование типов (приведение типов)
// Приведение работатет через ключевое слово as
const connection = {
  host: 'localhost',
  protocol: 'https' as 'https',
}

function connect(host: string, protocol: 'http' | 'https') {}

connect(connection.host, connection.protocol)

// Enum
// Создаем
enum Direction {
  Left,
  Right,
}

// Обращение
Direction.Left // Вернет 0 (это дефолтное занчение)

enum Direction2 { // Строковое значение
  Left = 'left',
  Right = 'right',
}

Direction2.Left // Вернет left

// Использование в функции
function move(direction: Direction) {
  switch (direction) {
    case Direction.Left:
      return -1
    case Direction.Right:
      return 1
  }
}

// Константный ENUM
const enum Direction3 {
  Up = 4,
  Down = 3,
}

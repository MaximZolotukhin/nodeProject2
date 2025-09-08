let hello = 'Привет'

if (typeof a === 'string') {
}

// С помощью typeof можно пристваить типы другой переменной
let hello2: typeof hello

// Ключевое слово keyof
type Coord3 = {
  lat: number
  long: number
}

// Позволяет типизировать переменные, которые должны быть одним из ключей объекта
type P = keyof Coord
let coord3: P = 'long' // Можно присвоить только lat или long
//Если надо ограничить занчения переменных

// Тип null обозначает отсутствие значения
function log(a: string | null): void {
  // void Говорит что унас функция ни чего не возвращает
  a?.toLowerCase()
}

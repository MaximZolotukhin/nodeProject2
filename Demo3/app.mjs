// Импорт в стиле commonJS
import { characters, greet } from './characters.mjs'
// Вариант 2 присваивание импортируемых данны к какой нибудь переменной
import * as char from './characters.mjs'

// Дефолтный импрот
import log from './characters.mjs'
// Вызов сразу дэфолтного экспорта и всех оставшихся экспортов
// import log, { characters, greet } from './characters.mjs'
// Вызов сразу дэфолтного экспорта и всех оставшихся экспортов с привязываниме к переменной
// import log, * as char from './characters.mjs'
// Вызов сразу дэфолтного экспорта и и других экспортов с перепревязыванием к другой перменной
// import log, { characters, greet as hello} from './characters.mjs'

for (const c of characters) {
  greet(c)
}

// Вариант 2
for (const c of char.characters) {
  greet(c)
}

//Вызов функции из дефолтного импорта
log()

//Ассинхронный импорт
async function main() {
  //Можно обертунь в try-catch
  try {
    const { characters, greet } = await import('./characters.mjs')
    for (const c of characters) {
      greet(c)
    }
  } catch (error) {
    console.log('Ошибка загрузки импорта')
  }
}

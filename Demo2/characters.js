let characters = [
  { name: 'Фродо', hasRing: false },
  { name: 'Бильбо', hasRing: false },
]

/**
 * Функция назначает владельца кольца
 * @param {*} characters герой
 * @param {*} owner владелец
 */
function stealRing(characters, owner) {
  //owner переводится как владелец
  return characters.map((c) => {
    if (c.name == owner) {
      c.hasRing = true
    } else {
      c.hasRing = false
    }
  })
}

module.exports = { characters, stealRing }

//Варинат 2
// Можно передавать в exports и функции
// module.exports = function log() {
//   console.log('log')
// }

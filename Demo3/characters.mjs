export const characters = [
  { name: 'Фродо', hasRing: false },
  { name: 'Бильбо', hasRing: false },
]

export function greet() {
  console.log('Поздравляю ' + characters)
}

// Дефолтный экспорт
export default function log() {
  console.log('log')
}

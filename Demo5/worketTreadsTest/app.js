import { performance } from 'perf_hooks'
import factorial from './factorial.js'

const main = () => {
  performance.mark('start')

  const result = [compute([25, 24, 32, 41, 50]), compute([25, 24, 32, 41, 50]), compute([25, 24, 32, 41, 50]), compute([25, 24, 32, 41, 50])]
  console.log(result)

  performance.mark('end')
  performance.measure('main', 'start', 'end')
  // Вывод результата
  console.log(performance.getEntriesByName('main').pop())
}

main()

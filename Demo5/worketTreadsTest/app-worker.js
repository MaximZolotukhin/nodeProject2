import { performance } from 'perf_hooks'
import { Worker } from 'worker_threads'

const compute = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: {
        array,
      },
    })

    worker.on('message', (msg) => {
      console.log(worker.threadId)
      resolve(msg)
    })

    worker.on('error', (err) => {
      console.log(worker.threadId)
      reject(err)
    })

    worker.on('exit', () => {
      console.log('Завершил работу')
    })
  })
}

const main = async () => {
  try {
    performance.mark('start')

    const result = await Promise.all([compute([25, 24, 32, 41, 50]), compute([25, 24, 32, 41, 50]), compute([25, 24, 32, 41, 50]), compute([25, 24, 32, 41, 50])])
    console.log(result)

    performance.mark('end')
    performance.measure('main', 'start', 'end')
    // Вывод результата
    console.log(performance.getEntriesByName('main').pop())
  } catch (err) {
    console.log(err.message)
  }
}

main()

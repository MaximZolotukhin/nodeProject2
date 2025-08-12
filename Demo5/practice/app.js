import { performance, PreformanceObserver } from 'perf_hooks'
import { Worker } from 'worker_threads'

const PreformanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`)
  })
})

PreformanceObserver.observe({ entryTypes: ['mesure'] })

const workerFunction = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark('worker start')

    const worker = new Worker('./worker.js', {
      workerData: {
        array,
      },
    })

    worker.on('message', (msg) => {
      performance.mark('worker end')
      performance.measure('worker', 'worker start', 'worker end')
      resolve(msg)
    })
  })
}

const forkFunction = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark('fork start')

    const forkProccess = fork('./fork.js')

    forkProccess.send({ array })
    forkProccess.on('message', (msg) => {
      performance.mark('worker end')
      performance.measure('worker', 'worker start', 'worker end')
      resolve(msg)
    })
  })
}

const main = async () => {
  await workerFunction([25, 19, 48, 30])
  await forkFunction([25, 19, 48, 30])
}

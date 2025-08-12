// worker.js
import { parentPort } from 'worker_threads'

parentPort.on('message', (subArray) => {
  let count = 0
  for (const num of subArray) {
    if (num % 3 === 0) count++
  }
  parentPort.postMessage(count)
  worker.postMessage('close') // Сигнал worker’у завершиться
})

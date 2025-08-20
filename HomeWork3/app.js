// main.js
import { Worker } from 'worker_threads'
import os from 'os'

// Создаём массив от 1 до 300 000
const createArray = () => {
  const arr = new Array(300000)
  for (let i = 1; i <= 300000; i++) {
    arr[i - 1] = i
  }
  return arr
}

// Линейный подсчёт
const linearCount = (arr) => {
  let count = 0
  for (const num of arr) {
    if (num % 3 === 0) count++
  }
  return count
}

// Разделение массива на части
const splitArray = (arr, n) => {
  const size = Math.ceil(arr.length / n)
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

// Многопоточный подсчёт
const parallelCount = async (arr) => {
  const numCPUs = os.cpus().length
  const chunks = splitArray(arr, numCPUs)
  const workers = []

  for (const chunk of chunks) {
    const worker = new Promise((resolve, reject) => {
      const w = new Worker('./worker.js')
      w.postMessage(chunk)
      w.on('message', resolve)
      w.on('error', reject)
      w.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
      })
    })
    workers.push(worker)
  }

  const results = await Promise.all(workers)
  return results.reduce((sum, count) => sum + count, 0)
}

// Основная функция
const run = async () => {
  console.log('Создание массива от 1 до 300 000...')
  const arr = createArray()

  // Линейный подход
  console.log('\n🔹 Линейный подход...')
  const startLinear = performance.now()
  const linearResult = linearCount(arr)
  const timeLinear = performance.now() - startLinear

  console.log(`Количество чисел, делящихся на 3: ${linearResult}`)
  console.log(`Время выполнения: ${timeLinear.toFixed(2)} мс`)

  // Многопоточный подход
  console.log('\n🔹 Многопоточный подход...')
  const startParallel = performance.now()
  const parallelResult = await parallelCount(arr)
  const timeParallel = performance.now() - startParallel

  console.log(`Количество чисел, делящихся на 3: ${parallelResult}`)
  console.log(`Время выполнения: ${timeParallel.toFixed(2)} мс`)

  // Сравнение
  console.log('\n📊 Сравнение:')
  console.log(`Линейный:   ${timeLinear.toFixed(2)} мс`)
  console.log(`Многопоточный: ${timeParallel.toFixed(2)} мс`)

  if (timeParallel < timeLinear) {
    console.log('✅ Многопоточный подход быстрее')
  } else {
    console.log('❌ Линейный подход оказался быстрее (возможно, из-за накладных расходов)')
  }
}

run().catch(console.error)

import { fork } from 'child_process'

// запуск дочернего процесса
const forkProcces = fork('./fork.js')

// Получаем сообщение от дочернего процесса
forkProcces.on('message', (msg) => {
  console.log(`Получено сообщение ${msg}`)
})

// Событие 'close' — когда процесс полностью завершён
forkProcces.on('close', (code) => {
  console.log(`Exited ${code}`)
})

// Отправляем сообщения в дочерний процесс
forkProcces.send('ping')
forkProcces.send('disconnect')

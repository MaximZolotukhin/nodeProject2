// // ОТСЛЕЖИВАЕТ ВЫПОЛНЕНИЯ ПЕРЕДАННОГО СОБЫТИЯ И ВЫВОДИТ ИНФОРМАЦИЮ ОБ РЕЗУЛЬТАТАХ РАБОТЫ
// import { exec } from 'child_process'

// // Запускаем команду `ls` (выводит список файлов в текущей директории)
// // `exec` принимает:
// //   - команду как строку
// //   - callback-функцию, которая вызывается, когда команда завершится
// const childProcess = exec('ls', (err, stdout, stderr) => {
//   if (err) {
//     console.log(err.message)
//   }
//   // `stdout` — стандартный вывод команды (результат выполнения)
//   console.log(`stdout: ${stdout}`)
//   // `stderr` — стандартный поток ошибок (если команда что-то туда вывела)
//   console.log(`stderr: ${stderr}`)
// })

// childProcess.on('exit', (code) => {
//   console.log(`code : ${code}`)
// })

/*
Метод spawn в Node.js нужен для создания новых процессов — дочерних процессов основного процесса Node.js. Это позволяет:
Запускать внешние команды и взаимодействовать с потоками ввода и вывода дочернего процесса в реальном времени. 
geeksforgeeks.org
Отдавать ресурсоёмкие задачи на отдельный процесс, чтобы не блокировать цикл обработки событий в Node.js. Например, для обработки видео, где каждый образ требует ресурсоёмкого преобразования FFmpeg, метод spawn позволяет передать работу отдельному процессу. 
dev.to
stackabuse.com
Генерировать большие файлы (например, CSV или Excel) — это предотвращает исчерпание памяти в процессе Node.js. 
dev.to
*/

import { spawn } from 'child_process'

const childProcess = spawn('ls')

childProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`)
})

childProcess.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`)
})

childProcess.stderr.on('exit', (code) => {
  console.log(`Код выхода: ${code}`)
})

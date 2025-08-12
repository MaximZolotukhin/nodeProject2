process.on('message', (msg) => {
  // Завершение процесса
  if (msg === 'disconnect') {
    process.exit(0) // ✅ Корректно завершает процесс
  }
  console.log(msg)
  process.send('pong')
})

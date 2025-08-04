// Модуль для работы с файлами
fs = require('fs') // Подключаем модуль

const data = fs.readFileSync('./data.txt') //Считываем файл
console.log(data.toString()) //Вызываем что сохранено в буфере

import http from 'http'

const host = '127.0.0.1'
const port = 8000

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET': {
      switch (req.url) {
        case '/hello':
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/plain')
          res.end('Привет!')
          break
      }
      break
    }
  }
  console.log(req.method) // Каким методом пришел запрос
  console.log(req.url) // С какого адреса пришел запрос
})

server.listen(port, host, () => {
  console.log(`Сервер запущен на ${host}:${port}`)
})

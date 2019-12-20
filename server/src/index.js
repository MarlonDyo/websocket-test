const express = require('express')
const app = express()
var cors = require('cors')
const port = 4000
const http = require("http");
const SingletonWebSocket = require('./websocket/websocket')
const server = http.createServer(app);

SingletonWebSocket.create(server)

app.use(cors())
app.use(express.json()) // This is needed to parse json bodies

app.get('/', (req, res) => {
  return res.send('Hello World!')
})


server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()

const wass = new WebSocketServer({port: process.env.PORT || 8080})

wass.on("connection" , (ws)=>{
  ws.on("error" , console.error)
  ws.send("mensagem enviada pelo servidor !")
  ws.on("message" , (data)=>{
    console.log(data.toString())
    wass.clients.forEach((clients)=> clients.send(data.toString()))
  })
  console.log("client connected")
})
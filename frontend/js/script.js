//chat login.....

const login = document.querySelector('.login')
const loginForm = document.querySelector('.login_form')
const loginInput = document.getElementById('nome')

//chat message.....

const chat = document.querySelector('.chat')
const chatForm = document.querySelector('.chat_form')
const chatInput = document.querySelector('#chat_input')
const chatMessage = document.querySelector('.chat_message')

const colors = [
             "cadetblue",
             "gold",
             "darkgoldenrod",
             "cornflowerblue",
             "darkkhaki",
             "hotpink"
  
  ]
const user = { id: "" , name: "" , color: "" }

let websocket
const createMessageElement = (content)=>{
   const div = document.createElement("div")
   div.classList.add('message_self')
   div.innerHTML = content
   return div
}
const createOtherMessageElement = (content , sender , senderColor)=>{
   const div = document.createElement("div")
   const span = document.createElement("span")
   div.classList.add('other_message')
   span.classList.add('sender_message')
   span.style.color = senderColor
   div.appendChild(span)
   span.innerHTML = sender
   div.innerHTML += content
   return div
}

const getRandomColor = ()=>{
   const randomIndex = Math.floor(Math.random() * colors.lenght)
   return colors[randomIndex]
}

const scrollScreem = ()=>{
   window.scrollTo({
      top:document.body.scrollHeight,
      behavior: "smoth"
  }) 
} 

const processMessage = ({data})=>{
   const {userId, userName, userColor, content} = JSON.parse(data)
   const mensagem = userId == user.id ? createMessageElement(content ) : createOtherMessageElement(content , userName , userColor)
   chatMessage.appendChild(mensagem)
   scrollScreem()
}

const handleLogin = (event) => {
    event.preventDefault()
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColor()
    
    login.style.display = "none"
    chat.style.display = "flex"
    websocket = new WebSocket("ws://localhost:8080")
    websocket.onmessage = processMessage
    websocket.onopen = ()=>{
       websocket.send(`usuario : ${user.name} Entrou no chat !`)
    }
}
const sendMessage = (event)=>{
   event.preventDefault()
   
   const message = {
      userId : user.id ,
      userName : user.name ,
      userColor : user.color ,
      content : chatInput.value
   }
   websocket.send(JSON.stringify(message))
   
   chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)
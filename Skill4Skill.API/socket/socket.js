const socket_io = require("socket.io");
exports.createSockets = (_server) => {
  let io = socket_io(_server, {
 
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })
 
  io.on("connection", (socket) => {
    socket.on("FromAPI" , (msg)=> {
    
      socket.on("disconnected",()=>{
      })
      io.sockets.emit("nodeJsEvent", msg);
    } )
  })
}

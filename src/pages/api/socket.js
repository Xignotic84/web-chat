import {Server} from "socket.io";

const jwt = require('jsonwebtoken');

import {UserService} from "../../services/User";

export default function SocketHandler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    io.use(function (socket, next) {
      /*
      if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, 'tada', function (err, decoded) {
          console.log(err)
          if (err) return next(new Error('Authentication error'));
          socket.decoded = decoded;
          next()
        })

        next()
       */
      next()
    }).on('connection', socket => {
      console.log("[SERVER] Connection Created")

      socket.on('authorIsTyping', (arg) => {
        socket.broadcast.emit('userIsTyping', arg)
      })

      socket.on('authorHasStoppedTyping', (arg) => {
        console.log(true)
        socket.broadcast.emit('userHasStoppedTyping', arg)
      })

      socket.on('joinRoom', (arg) => {
        const user = UserService.adduserToRoom({id: socket.id, ...arg})


        socket.join("1")
      })

      socket.on("sendMessage", (arg) => {

        console.log("[SERVER] Received Message", arg.message)

        socket.broadcast.emit('broadcastMessage', arg)
      })

      socket.on("disconnect", (arg) => {
        console.log("[SERVER] Connection Disconnected")
        const user = UserService.adduserToRoom({id: socket.id, ...arg})

        socket.broadcast.emit("userLeftRoom", user)
      })
    })


    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }

  res.end()
}
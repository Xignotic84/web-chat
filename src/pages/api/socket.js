import {Server} from "socket.io";

const jwt = require('jsonwebtoken');


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

      socket.on("sendMessage", (arg) => {
        console.log("[SERVER] Received Message", arg.message)
        socket.broadcast.emit('broadCastMessage', arg)
      })
    })


    io.on('disconnect', socket => {
      console.log("[SERVER] Connection Disconnected")
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }

  res.end()
}
import {Server} from "socket.io";


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
      socket.onAny((eventName, args) => {
        console.log(`[SERVER] [${eventName}]`, args)
      })

      socket.on('authorIsTyping', (arg) => {
        socket.broadcast.emit('userIsTyping', arg)
      })

      socket.on('authorHasStoppedTyping', (arg) => {
        socket.broadcast.emit('userHasStoppedTyping', arg)
      })

      socket.on('joinRoom', (arg) => {

        socket.join("0")
        socket.join(arg.roomID)

        //socket.to(arg.roomID).emit('joinRoom', arg);

        socket.emit("userRoomUpdate", Array.from(socket.rooms).slice(1, socket.rooms.length))
      })

      socket.on("sendMessage", (arg) => {
        socket.to(arg.roomID).emit('broadcastMessage', arg)
      })

      socket.on("disconnect", (arg) => {
        socket.broadcast.emit("userLeftRoom", arg.user)
      })
    })


    res.socket.server.io = io
  }

  res.end()
}
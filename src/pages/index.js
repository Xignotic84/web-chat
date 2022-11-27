import io from "socket.io-client";
import {useState, useEffect} from "react";
import {Box, Button, Center, Input, Text, Textarea} from "@chakra-ui/react";
import Message from "../components/message";
import {AuthService} from "../services/Auth";

import config from './../config.json'
import MembersList from "../components/MembersList";

const names = ["Alex", "James", "Franz", "Daniel"]
const name = names[Math.floor(Math.random()*names.length)];

let socket


export default function Home() {
  const [messageToSend, setMessageToSend] = useState("");
  const [messages, setMessages] = useState([])
  const [listOfUsers, setListOfUsers] = useState([])

  useEffect(() => {
    fetch(`${config.api.baseURL}/socket`)
    socket = io({reconnectionAttempts: 5, query: {token: AuthService.generateJSWToken({username: "Xignotic"})}})

    if (socket) {

      socket.emit("joinRoom", {username: name})

      setListOfUsers((currentUsers) => [
        ...currentUsers,
        {username: name}
      ])
  
      socket.on('broadcastMessage', (msg) => {
        console.log("Received Message", msg.message)
        setMessages((currentMsg) => [
          ...currentMsg,
          msg,
        ])
        socket.off("broadcastMessage", msg)
      })

      socket.on("userJoinedRoom", user => {
        setListOfUsers((currentUsers) => [
          ...currentUsers,
          user
        ])
      })

      socket.on("broadcastNotification", msg => {
        setMessages((currentMsg) => [
          ...currentMsg,
          msg,
        ]);
      })
    }

    return () => {
      socket.off()
    }
  }, [])


  function sendMessage() {
    console.log(1, listOfUsers)
    const msgObj = {
      author: {
        username: name
      },
      message: messageToSend,
      timestamp: new Date().getTime()
    }
    socket.emit('sendMessage', msgObj)

    setMessages((currentMsg) => [
      ...currentMsg,
      msgObj,
    ]);

    setMessageToSend("")
  }

  const handleKeyPress = (e) => {
    if (e.nativeEvent.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage()
    }
  }

  return (
      <Center>
        <Box w={"50%"} >
          <Box>
            {messages.map(msg => {
              return <Message data={msg}/>
            })}
          </Box>
          <Box>
            <MembersList members={listOfUsers}/>
          </Box>
          <Box
              display={"flex"}
              position={"fixed"}
              bottom={4}
          >
            <Textarea
                w={"800px"}
                rows={0}
                minHeight={"20px"}
                value={messageToSend}
                onChange={(event) => setMessageToSend(event.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
            />
            <Button onClick={() => sendMessage("test")}>
              Send
            </Button>
          </Box>
        </Box>
      </Center>
  )
}
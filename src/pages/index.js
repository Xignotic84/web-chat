import io from "socket.io-client";
import {useState, useEffect} from "react";
import {Box, Button, Center, Input, Text, Textarea} from "@chakra-ui/react";
import Message from "../components/message";
import {AuthService} from "../services/Auth";
import {darkTheme} from "../themes/dark";

import config from './../config.json'
import MembersList from "../components/membersList";

const names = ["Alex", "James", "Franz", "Daniel"]
const username = names[Math.floor(Math.random() * names.length)];
const colorKeys = Object.values(darkTheme.colors.users)
const color = colorKeys[Math.floor(Math.random() * colorKeys.length)];

let socket


export default function Home() {
  const [messageToSend, setMessageToSend] = useState("");
  const [messages, setMessages] = useState([])
  const [listOfUsers, setListOfUsers] = useState([])

  useEffect(() => {
    fetch(`${config.api.baseURL}/socket`)
    socket = io({reconnectionAttempts: 5, query: {token: AuthService.generateJSWToken({username: "Xignotic"})}})

    if (socket) {

      socket.emit("joinRoom", {username, color})

      console.log(color)

      setListOfUsers((currentUsers) => [
        ...currentUsers,
        {username, color}
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

      socket.on("userLeftRoom", user => {
        console.log(true)
        setListOfUsers((currentUsers) => currentUsers.filter(u => u.id !== user.id))
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
    if (!messageToSend || messageToSend.length === 0) return

    const msgObj = {
      user: {
        username,
        color
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
      <Box overflow={"hidden"}>
        <Center overflow={"hidden"}>
          <Box w={"50%"}>
            <Box>
              {messages.map(msg => {
                return <Message data={msg}/>
              })}
            </Box>
            <Box
                display={"flex"}
                position={"fixed"}
                bottom={4}
            >
              <Text>

              </Text>
              <Textarea
                  border={"none"}
                  outline={"none"}
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
        <Box  w={"20%"} h={"100%"} position={"fixed"} top={0} right={0}>
          <MembersList members={listOfUsers}/>
        </Box>
      </Box>
  )
}
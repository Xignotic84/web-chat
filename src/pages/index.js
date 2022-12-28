
import {useState, useEffect, createRef, useContext} from "react";
import {Box, Button, Center, Input, Text, Textarea} from "@chakra-ui/react";
import Message from "../components/message";
import MessageGroups from "../components/messageGroups";
import {AuthService} from "../services/Auth";
import {darkTheme} from "../themes/dark";

import config from './../config.json'
import {Search2Icon} from "@chakra-ui/icons";
import CreateRoom from "../components/createRoom";
import {SocketContext} from "../context/socket";

const names = ["Alex", "James", "Franz", "Daniel"]
const username = names[Math.floor(Math.random() * names.length)];
const colorKeys = Object.values(darkTheme.colors.users)
const color = colorKeys[Math.floor(Math.random() * colorKeys.length)];


export default function Home() {
  const [messageToSend, setMessageToSend] = useState("");
  const [messages, setMessages] = useState([])
  const [listOfUsersTyping, setListOfUsersTyping] = useState([])
  const [listOfUsers, setListOfUsers] = useState([])
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {

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

      socket.on('userIsTyping', username => {
        if (!listOfUsersTyping.includes(username)) {
          setListOfUsersTyping((currentUsers) => [
            ...currentUsers.filter(c => c !== username).splice(0, 2),
            username
          ])
        }
      })

      socket.on('userHasStoppedTyping', username => {
        setListOfUsersTyping(listOfUsersTyping.filter(c => c !== username))
      })

      socket.on("userLeftRoom", user => {
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

  function setUserTypingState(isTyping = false) {

    if (isTyping) {
      socket.emit('authorIsTyping', username)

    } else {
      socket.emit('authorHasStoppedTyping', username)

    }

  }

  const handleKeyPress = (e) => {

    if (isMessageBarFocused) {
      setUserTypingState(true)
      setTimeout(() => {
        if (!isMessageBarFocused || setMessageToSend.length === 0) {
          console.log(true)
          setUserTypingState(false)
        }
      }, 3000)
    }

    if (e.nativeEvent.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage()

      setUserTypingState(false)
    }
  }

  const messageEndRef = createRef()

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  })

  const [isMessageBarFocused, setFocused] = useState(false)

  return (
      <Box overflow={"hidden"} display={"flex"}>
        <Box>
          <Box ml={10} width={"fit-content"}>
            <Box display={"flex"} bg={"white"} borderRadius={20} p={2} alignItems={"center"}>
              <Search2Icon/>
              <Input borderRadius={20} placeholder={"Search"} _placeholder={{color: "black"}}/>
            </Box>
            <Box mt={5} borderRadius={20} overflow={"scroll"} bg={"white"}>
              <MessageGroups selected={true}/>
              <MessageGroups/>
              <MessageGroups/>
              <CreateRoom/>
            </Box>
          </Box>
        </Box>

        <Box position={"relative"} overflow={"scroll"} w={"50%"} ml={5} h={"700px"} borderRadius={20} p={2} bg={"white"} >
          <Box>
            {messages.map((msg, i) => {
              return <Message key={i} data={msg}/>
            })}
          </Box>

          <Box ref={messageEndRef}/>
          <Text  color={"gray.400"}>
            {listOfUsersTyping.map(user => {
              return user
            }).join(", ")}
            {listOfUsersTyping[0] ? " isTyping..." : ""}
          </Text>
          <Box margin={"0 auto"} position={"sticky"} bottom={0} display={"flex"}>
            <Textarea
              borderRadius={20}
              bg={"backgrounds.main"}
              border={"none"}
              outline={"none"}
              _placeholder={{color: "black"}}
              color={"black"}
              placeholder={"Write a message..."}
              w={"80%"}
              rows={0}
              minHeight={"20px"}
              value={messageToSend}
              onFocus={setFocused}
              onChange={(event) => setMessageToSend(event.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <Button onClick={() => sendMessage("test")}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
  )
}
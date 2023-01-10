import {useState, useEffect, createRef, useContext} from "react";
import {Avatar, Box, Button, Center, Flex, Heading, Input, Text, Textarea} from "@chakra-ui/react";
import Message from "../../components/message";
import MessageGroups from "../../components/messageGroups";
import {Search2Icon} from "@chakra-ui/icons";
import CreateRoom from "../../components/createRoom";
import {SocketContext} from "../../context/socket";
import GroupHeading from "../../components/groupHeading";
import MessageInput from "../../components/messageInput";
import {useRouter} from "next/router";
import MemberList from "../../components/memberList";
import {UserContext} from "../../context/user";


export default function Room() {
  const router = useRouter()
  const id = router.query.id

  const {user} = useContext(UserContext)

  const [messageToSend, setMessageToSend] = useState("")
  const [listOfUsersTyping, setListOfUsersTyping] = useState([])

  const [messages, setMessages] = useState([])

  useEffect(()=>{
    setMessages([])
  },[id])

  const socket = useContext(SocketContext);


  useEffect(() => {
    if (!id) return

    socket.emit('joinRoom', {roomID: id, user: user})

  }, [id])

  useEffect(() => {
    if (socket) {

      socket.onAny((eventName, ...args) => {
        console.log(eventName, args)
      });

      socket.on('broadcastMessage', (msg) => {
        setMessages((currentMsg) => [
          ...currentMsg,
          msg,
        ])
        socket.off("broadcastMessage", msg)
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


  const messageEndRef = createRef()

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  useEffect(() => {
    scrollToBottom()
  })

  return (
      <Box overflow={"hidden"} display={"flex"}>
        <Box>
          <Box ml={10} width={"fit-content"}>
            <Box display={"flex"} bg={"white"} height={65} borderRadius={20} p={2} alignItems={"center"}>
              <Search2Icon/>
              <Input borderRadius={20} placeholder={"Search"} _placeholder={{color: "black"}}/>
            </Box>
            <Box mt={5} borderRadius={20} bg={"white"}>
              <MessageGroups selected={true}/>
              <CreateRoom/>
            </Box>
          </Box>
        </Box>
        <Box ml={5} w={"60%"}>
          <GroupHeading/>
          <Box mt={5} position={"relative"} h={"600px"} overflow={"auto"} borderRadius={20} bg={"white"}>
            <Box>
              {messages.map((msg, i) => {
                return <Message key={i} data={msg}/>
              })}
            </Box>

            <Box ref={messageEndRef}/>

            <Box position={"sticky"} bottom={2} w={"80%"} left={7}>
              <Text color={"gray.400"}>
                {listOfUsersTyping.map(user => {
                  return user
                }).join(", ")}
                {listOfUsersTyping[0] ? " isTyping..." : ""}
              </Text>
              <MessageInput user={user} setMessages={setMessages}/>
            </Box>
          </Box>
        </Box>
        <Box ml={5}>
          <MemberList/>
        </Box>
      </Box>
  )
}
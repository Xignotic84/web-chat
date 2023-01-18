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
import {UserContext} from "../../context/user";
import ProfileModal from "../../components/profileModal";

export default function Room() {
  const router = useRouter()
  const socket = useContext(SocketContext);
  const {user} = useContext(UserContext)
  const [messageToSend, setMessageToSend] = useState("")
  const [listOfUsersTyping, setListOfUsersTyping] = useState([])
  const [messages, setMessages] = useState([])


  const id = router.query.id


  useEffect(() => {
    if (!id) return

    fetch(`http://localhost:3000/api/messages/${id}`).then(r => r.json()).then(m => setMessages(m))


    socket.emit('joinRoom', {roomID: id, user: user})

  }, [id])

  useEffect(() => {
    if (socket) {

      socket.onAny((eventName, ...args) => {
        //console.log(eventName, args)
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
  const messageBoxRef = createRef()

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
      <Box overflow={"hidden"} display={"flex"}>
        <Box ml={10} width={"fit-content"}>
          <MessageGroups/>
          <CreateRoom/>
          <ProfileModal/>
        </Box>
        <Box ml={5} w={"60%"}>
          <GroupHeading/>
          <Box ref={messageBoxRef} mt={5} position={"relative"} h={"600px"} overflow={"auto"} borderRadius={20} bg={"white"}>
            {messages.map((msg, i) => {
              return <Message key={i} data={msg}/>
            })}

            <Box ref={messageEndRef}/>

            <Box position={"sticky"} bottom={0} p={2} w={"100%"} height={"auto"} left={7} bg={"white"}>
              <Text color={"gray.400"}>
                {listOfUsersTyping.map(user => {
                  return user
                }).join(", ")}
                {listOfUsersTyping[0] ? " isTyping..." : ""}
              </Text>
              <MessageInput mb={2} user={user} setMessages={setMessages}/>
            </Box>
          </Box>
        </Box>

      </Box>
  )
}
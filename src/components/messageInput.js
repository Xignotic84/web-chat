import {Box, Button, Textarea} from "@chakra-ui/react";
import {useContext, useState} from "react";
import {SocketContext} from "../context/socket";
import {nanoid} from 'nanoid'
import {useRouter} from "next/router";

export default function MessageInput({user, setMessages}) {
  const [messageToSend, setMessageToSend] = useState("");
  const [isMessageBarFocused, setFocused] = useState(false)
  const socket = useContext(SocketContext);
  const router = useRouter()

  function sendMessage() {
    if (!messageToSend || messageToSend.length === 0) return

    const msgObj = {
      id: nanoid(),
      roomID: router.query.id,
      user: user,
      message: messageToSend,
      timestamp: new Date().getTime(),
    }

    socket.emit('sendMessage', msgObj)

    setMessages((currentMsg) => [
      ...currentMsg,
      msgObj,
    ]);

    setMessageToSend("")
  }

  const handleKeyPress = (e) => {


    function setUserTypingState(isTyping = false) {

      if (isTyping) {
        socket.emit('authorIsTyping', user.username)

      } else {
        socket.emit('authorHasStoppedTyping', user.username)
      }
    }

    if (isMessageBarFocused) {
      setUserTypingState(true)
      setTimeout(() => {
        if (!isMessageBarFocused || setMessageToSend.length === 0) {
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

  return (
    <Box height={"auto"} margin={"0 auto"} display={"flex"} bg={"white"}>
      <Textarea
        borderRadius={10}
        bg={"backgrounds.main"}
        border={"none"}
        outline={"none"}
        _placeholder={{color: "black"}}
        color={"black"}
        placeholder={"Write a message..."}
        w={"100%"}
        overflow={"auto"}
        minHeight={"20px"}
        value={messageToSend}
        onFocus={setFocused}
        onChange={(event) => setMessageToSend(event.target.value)}
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <Button onClick={() => sendMessage()}>
        Send
      </Button>
    </Box>
  )
}
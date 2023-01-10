import {Box, Button, Textarea} from "@chakra-ui/react";
import {useContext, useState} from "react";
import {SocketContext} from "../context/socket";
import {useRouter} from "next/router";

export default function MessageInput({user, setMessages}) {
  const [messageToSend, setMessageToSend] = useState("");
  const [isMessageBarFocused, setFocused] = useState(false)
  const socket = useContext(SocketContext);
  const router = useRouter()


  const handleKeyPress = (e) => {
    function sendMessage() {
      if (!messageToSend || messageToSend.length === 0) return

      const msgObj = {
        user: user,
        message: messageToSend,
        timestamp: new Date().getTime(),
        roomID: router.query.id
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
      <Box margin={"0 auto"} display={"flex"}>
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
  )
}
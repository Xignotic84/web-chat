import {
  Avatar, Box,
  Button, Heading, Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";

import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../context/socket";
import {UserContext} from "../context/user";
import ColorPicker from "./colorPicker";
import {setCookie} from "cookies-next";
import { useAtom, atom  } from 'jotai'

export default function ProfileModal({}) {

  const socket = useContext(SocketContext)
  const {user, setUser} = useContext(UserContext)

  const {isOpen, onOpen, onClose} = useDisclosure({defaultIsOpen: !user})

  const [username, setUsername] = useState()
  const [color, setColor] = useState()


  function connectToSocket() {
    setCookie("jwtToken", JSON.stringify({username, color}), {httpOnly: true})

    setUser({username, color})
    setUsername(username)
    setColor(color)

    socket.connect()
  }

  console.log(user)

  return (
      <>
        <Button onClick={onOpen}>
          Test
        </Button>
        <Modal
            blockScrollOnMount={true}
            closeOnOverlayClick={user}
            isCentered
            onClose={onClose}
            closeOnEsc={user}
            isOpen={isOpen}
            motionPreset='slideInBottom'
        >
          <ModalOverlay/>
          <ModalContent bg={"white"} color={"black"}>
            <ModalHeader>Profile</ModalHeader>
            <ModalBody>
              <ColorPicker setColor={setColor}/>
              <Box
                  display={"flex"}
                  justifyContent={"center"}
              >
                <Avatar
                    name={username}
                    size={"lg"}
                    bg={color}
                />
              </Box>
              <Heading size={"sm"}>
                Username
              </Heading>
              <Input defaultValue={username} onChange={(v) => setUsername(v.target.value)} bg={"backgrounds.main"}/>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => {
                connectToSocket()
                onClose()
              }}>
                Login
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  )
}
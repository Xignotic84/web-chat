import {
  Avatar, Box,
  Button, Flex, Heading, Input,
  Modal,
  ModalBody,
  ModalContent,
  Card,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Text,
  useDisclosure, CardHeader, useColorMode
} from "@chakra-ui/react";
import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../context/socket";
import {UserContext} from "../context/user";
import ColorPicker from "./colorPicker";
import {setCookie} from "cookies-next";
import { useAtom, atom  } from 'jotai'
import {MoonIcon, SettingsIcon, SunIcon} from "@chakra-ui/icons";

export default function ProfileModal({}) {

  const socket = useContext(SocketContext)
  const {user, setUser} = useContext(UserContext)

  if (user) socket.connect()

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

  const {colorMode, toggleColorMode} = useColorMode();


  return (
      <>
        <Card mt={5} transition={"background-color 500ms"} cursor={"pointer"} w={370} p={0} color={"black"} maxW='md' bg={"white"} borderRadius={20} boxShadow={"none"}>
          <CardHeader>
            <Flex alignItems='center' >
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Avatar name={user.username} bg={user.color}/>
                <Box>
                  <Heading size='md' color={"black"}>{user.username}</Heading>
                  <Text fontSize={12} color={"gray.500"}>Signed in 5 hours ago...</Text>
                </Box>
              </Flex>
              <Flex gap={4} alignItems={"center"}>
                {colorMode === 'light' ? <MoonIcon onClick={toggleColorMode}/> : <SunIcon onClick={toggleColorMode}/>}
                <SettingsIcon onClick={onOpen}/>
              </Flex>
            </Flex>
          </CardHeader>
        </Card>
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
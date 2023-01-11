import {
  Avatar,
  Box,
  Button, Card, CardHeader, Flex, Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Text, useDisclosure
} from "@chakra-ui/react";

import { nanoid } from 'nanoid'
import {AddIcon} from "@chakra-ui/icons";
import {SocketContext} from "../context/socket";
import {useContext} from "react";
import { useRouter } from 'next/router'


export default function CreateRoom({}) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const router = useRouter()

  const socket = useContext(SocketContext);


  function createRoom() {
    const generatedRoomID = nanoid()
    socket.emit('joinRoom', {
      user: {
        username: "Xignotic"
      },
      roomID: generatedRoomID
    })

    router.push(`/rooms/${generatedRoomID}`)
  }

  return (
      <>
        <Card mt={5} cursor={"pointer"} onClick={onOpen} w={370} p={0} maxW='md' bg={"white"} borderRadius={20}
              boxShadow={"none"}>
          <CardHeader>
            <Flex>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <AddIcon color={"black"} borderRadius={"20px"} boxSize={35} bg={"gray.200"} p={2}/>
                <Box>
                  <Heading size='sm' color={"black"}>Create Room</Heading>
                  <Text color={"text.gray"} isTruncated w={250}>
                    Create your very own chat room
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>
        </Card>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent bg={"white"}>
            <ModalHeader>Create Room</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <Card w={370} p={0} maxW='md' borderRadius={0} bg={"white"} boxShadow={"none"}>
                <CardHeader>
                  <Flex>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                      <AddIcon alt={"Group Icon"} cursor={"pointer"} color={"black"} borderRadius={"20px"} boxSize={38}
                               bg={"gray.200"} p={2}>
                        <Input type={"file"}/>
                      </AddIcon>

                      <Box bg={"gray.200"} p={2} borderRadius={20}>
                        <Input p={2} variant={"flushed"} color={"black"} _placeholder={{color: "black"}}
                               placeholder={"New group name"}/>

                      </Box>
                    </Flex>
                  </Flex>
                </CardHeader>
              </Card>
            </ModalBody>

            <ModalFooter>
              <Button bg={"red.400"} mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' color={"gray"} onClick={() => {
                createRoom()
                onClose()
              }}>Create</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  )
}
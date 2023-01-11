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
  ModalCloseButton,
  useDisclosure, CardHeader, useColorMode
} from "@chakra-ui/react";
import {useContext, useState} from "react";
import {SocketContext} from "../context/socket";
import ColorPicker from "./colorPicker";
import {SettingsIcon} from "@chakra-ui/icons";

export default function GroupModal({children}) {

  const socket = useContext(SocketContext)

  const {isOpen, onOpen, onClose} = useDisclosure()

  const [name, setName] = useState()
  const [color, setColor] = useState()


  return (
    <>
      <Box onClick={onOpen} cursor={"pointer"}>
        {children}
      </Box>
      <Modal
        blockScrollOnMount={true}
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay/>
        <ModalContent bg={"white"} color={"black"}>
          <ModalHeader>
            Group Settings
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <ColorPicker setColor={setColor}/>
            <Box
              display={"flex"}
              justifyContent={"center"}
            >
              <Avatar
                name={name}
                size={"lg"}
                bg={color}
              />
            </Box>
            <Heading size={"sm"}>
              Group name
            </Heading>
            <Input defaultValue={name} onChange={(v) => setName(v.target.value)} bg={"backgrounds.main"}/>
          </ModalBody>
          <ModalFooter justifyContent={"space-between"}>
            <Button bg={"red.400"} colorScheme={"red"}>
              Delete
            </Button>
            <Button bg={"green.400"} colorScheme='green' ml={3} onClick={() => {
              onClose()
            }}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
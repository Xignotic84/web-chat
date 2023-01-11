import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../context/socket";
import {useRouter} from "next/router";
import {Avatar, Box, Card, CardHeader, Flex, Heading, Text} from "@chakra-ui/react";

export default function MessageRoom({room}) {
  const socket = useContext(SocketContext);
  const router = useRouter()
  const [isSelected, setSelectedState] = useState(router.query.id === room)
  const [lastMessage, setLastMessage] = useState("This is just a test will implement soon")

  useEffect(() => {
    setSelectedState(router.query.id === room)
  }, [router.query.id])

  function changeRoom(roomID) {
    router.push(`/rooms/${roomID}`)
  }

  return (
    <Card transition={"background-color 500ms"} cursor={"pointer"} onClick={() => {changeRoom(room)}} w={370} p={0} maxW='md' borderRadius={20} bg={isSelected ? "gray.200" : "none"} boxShadow={"none"}>
      <CardHeader>
        <Flex>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={room} src='https://bit.ly/sage-adebayo' />
            <Box>
              <Box position={"relative"}>
                <Text color={"gray.600"} position={"absolute"} top={0} right={0}>

                </Text>
              </Box>
              <Heading size='sm' color={"black"}>{room}</Heading>
              <Text color={"text.gray"} isTruncated w={200}>
                {lastMessage}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  )
}
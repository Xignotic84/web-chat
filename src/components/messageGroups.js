import  {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Avatar,
  Box,
  Image,
  IconButton,
  Flex,
  Divider, Link
} from '@chakra-ui/react'
import {useState, useContext} from "react";
import {useRouter} from "next/router";
import {SocketContext} from "../context/socket";
import MessageRoom from "./MessageRoom";

export default function MessageGroups({data}) {

  const [rooms, setRooms] = useState([])

  const socket = useContext(SocketContext);

  socket.on("userRoomUpdate", (roomList) => {
    setRooms(roomList)
  })


  return (
    <Box>
      {rooms.map((room) => {
        return <MessageRoom room={room}/>
      })
      }
    </Box>
  )
}
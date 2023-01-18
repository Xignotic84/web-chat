import {
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
  Divider, Link, Input
} from '@chakra-ui/react'
import {useState, useContext} from "react";
import {useRouter} from "next/router";
import {SocketContext} from "../context/socket";
import MessageRoom from "./MessageRoom";
import {Search2Icon} from "@chakra-ui/icons";

export default function MessageGroups({data}) {

  const [rooms, setRooms] = useState([])

  const socket = useContext(SocketContext);

  socket.on("userRoomUpdate", (roomList) => {
    setRooms(roomList)
  })


  return (
    <Box borderRadius={20} bg={"white"} maxHeight={"490px"} overflow={"scroll"}>
      <Box display={"flex"} bg={"white"} height={65} borderRadius={20} p={2} alignItems={"center"}>
        <Search2Icon/>
        <Input borderRadius={20} placeholder={"Search"} _placeholder={{color: "black"}}/>
      </Box>
      {rooms.map((room) => {
        return <MessageRoom room={room}/>
      })
      }
    </Box>
  )
}
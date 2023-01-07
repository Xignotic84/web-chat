import {Box, Heading, Input} from "@chakra-ui/react";
import Member from "./member";
import {useContext, useState} from "react";
import {SocketContext} from "../context/socket";

export default function MemberList({}) {
  const socket = useContext(SocketContext);
  const [listOfMembers, setListOfMembers] = useState([])

  socket.on('joinRoom', args => {
    setListOfMembers((currentUsers) => [
      ...currentUsers,
      args.user
    ])
  })

  socket.on("userLeftRoom", user => {
    // setListOfMembers((currentUsers) => currentUsers.filter(u => u.id !== user.id))
  })


  return (
      <Box bg={"white"} w={200} borderRadius={20} p={2} alignItems={"center"}>
        <Heading size={"lg"}>
          Members
        </Heading>
        <Box>
          {listOfMembers.map((m, i) => {
           return <Member key={i} member={m}/>
          })}
        </Box>
      </Box>
  )
}
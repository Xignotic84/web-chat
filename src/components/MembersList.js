import {
  Avatar, AvatarBadge,
  Box,
  Text
} from "@chakra-ui/react";


export default function MembersList({members}) {
  return (
    <Box>
      {members.map(m => {
        {console.log(m)}
        return <Box display={"flex"}>
          <Avatar>
            <AvatarBadge boxSize='1.25em' bg={m.status === "online" ? 'green.500' : "orange"} />
          </Avatar>
          <Text>
            {m.username}
          </Text>
        </Box>
      })}
    </Box>
  )
}
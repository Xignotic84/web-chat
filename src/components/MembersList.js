import {
  Avatar, AvatarBadge,
  Box,
  Text
} from "@chakra-ui/react";


export default function MembersList({members}) {
  return (
    <Box>
      {members.map(m => {
        return <Box key={m.id} display={"flex"}>
          <Avatar
            name={m.username}
          >
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
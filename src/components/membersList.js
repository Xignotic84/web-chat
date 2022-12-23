import {
  Avatar, AvatarBadge,
  Box,
  Text
} from "@chakra-ui/react";


export default function MembersList({members}) {
  return (
      <Box bg={"users.grey"}>
        {members.map(m => {
          return <Box mt={10} key={m.id} display={"flex"}>
            <Avatar
                size={"md"}
                name={m.username}
            >
              <AvatarBadge boxSize='1.25em' bg={m.status === "online" ? 'green.500' : "orange"}/>
            </Avatar>
            <Text color={m.color} ml={2} display={"flex"} alignItems={"center"}>
              {m.username}
            </Text>
          </Box>
        })}
      </Box>
  )
}
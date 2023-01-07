import {Avatar, AvatarBadge, Flex, Heading} from "@chakra-ui/react";

export default function Member({member}) {
  return (
      <Flex gap={4} display={"flex"} alignItems={"center"} mt={3}>
        <Avatar
            loading={"lazy"}
            bg={member.color}
            name={member.username}
            size={"sm"}>
          <AvatarBadge boxSize='1.2em' bg='green.500' borderColor={"white"}/>
        </Avatar>
        <Heading fontSize={"md"}>
          {member.username}
        </Heading>
      </Flex>
  )
}
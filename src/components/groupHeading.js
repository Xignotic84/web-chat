import {Avatar, Box, Button, Flex, Heading} from "@chakra-ui/react";

export default function GroupHeading({data}) {
  return (
      <Box h={65} alignItems={"center"} alignContent={"center"} justifyContent={"space-between"} display={"flex"}
           bg={"white"} borderRadius={20} p={2}>
        <Flex gap={4} alignItems={"center"}>
          <Avatar
              size={"md"}
              name={"Group name"}
          />
          <Heading size={"lg"}>
            Group name
          </Heading>
        </Flex>
        <Flex gap={4} alignContent={"center"}>
          <Button color={"black"} bg={"backgrounds.main"} borderRadius={10}>
            Create Invite
          </Button>
          <Button color={"black"} bg={"backgrounds.main"} borderRadius={10}>
            Delete Chat
          </Button>
        </Flex>
      </Box>
  )
}
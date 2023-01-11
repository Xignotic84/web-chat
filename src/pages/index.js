import {Avatar, Box, Button, Center, Flex, Heading, Input, Text, Textarea} from "@chakra-ui/react";
import MessageGroups from "../components/messageGroups";
import {Search2Icon} from "@chakra-ui/icons";
import CreateRoom from "../components/createRoom";
import GroupHeading from "../components/groupHeading";

export default function Home() {
  return (
      <Box overflow={"hidden"} display={"flex"}>
        <Box>
          <Box ml={10} width={"fit-content"}>
            <Box display={"flex"} bg={"white"} height={65} borderRadius={20} p={2} alignItems={"center"}>
              <Search2Icon/>
              <Input border={"0px solid"} outline={"none"} borderRadius={15} placeholder={"Search"} _placeholder={{color: "black"}}/>
            </Box>
            <Box mt={5} borderRadius={20} bg={"white"}>
              <MessageGroups/>
              <CreateRoom/>
            </Box>
          </Box>
        </Box>
        <Box ml={5} w={"60%"}>
          <GroupHeading/>
          <Box mt={5} position={"relative"} h={"600px"} overflow={"auto"} borderRadius={20} bg={"white"}>
          </Box>
        </Box>
      </Box>
  )
}
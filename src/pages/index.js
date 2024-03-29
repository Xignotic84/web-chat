import {Avatar, Box, Button, Center, Flex, Heading, Input, Text, Textarea} from "@chakra-ui/react";
import MessageGroups from "../components/messageGroups";
import {Search2Icon} from "@chakra-ui/icons";
import CreateRoom from "../components/createRoom";
import GroupHeading from "../components/groupHeading";
import ProfileModal from "../components/profileModal";

export default function Home() {
  return (
      <Box overflow={"hidden"} display={"flex"}>
        <Box ml={10} width={"fit-content"}>
          <MessageGroups/>
          <CreateRoom/>
          <ProfileModal/>
        </Box>
        <Box ml={5} w={"60%"}>
          <GroupHeading/>
          <Box mt={5} position={"relative"} h={"600px"} overflow={"auto"} borderRadius={20} bg={"white"}>
          </Box>
        </Box>
      </Box>
  )
}
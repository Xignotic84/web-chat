import {
  Avatar,
  Box,
  Button, Popover,
  PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tag,
  Flex, Heading
} from "@chakra-ui/react";
import moment from "moment"

export default function Message({data}) {
  return (
      <Box m={7}>
        <Box display={"flex"} position={"relative"}>
          <Box top={'0.5'} color={"gray"} opacity={"70%"} right={0} position={"absolute"}>
            {moment(data.timestamp).calendar()}
          </Box>
          <Box>
            <Popover placement='bottom-start'>
              <Box display={"flex"}>
                <PopoverTrigger>
                  <Avatar bg={data.user.color} cursor={"pointer"} size={"md"} name={data.user.username}/>
                </PopoverTrigger>
                <Box>
                  <PopoverTrigger w={"fit-content"}>
                    <Tag variant={"subtle"} bg={data.user.color} color={"black"} ml={3} cursor={"pointer"}>
                      {data.user.username}
                    </Tag>
                  </PopoverTrigger>
                  <Text ml={3} color={"black"} whiteSpace={"pre-wrap"}>
                    {data.message}
                  </Text>
                </Box>
              </Box>
              <PopoverContent bg={"backgrounds.main"}>
                <PopoverHeader>
                  <Flex gap={4} alignItems={"center"}>
                    <Avatar bg={data.user.color} size={"lg"} name={data.user.username}/>
                    <Box>
                      <Tag variant={"subtle"} bg={data.user.color} color={"black"}>
                        <Heading fontSize={16}>{data.user.username}</Heading>
                      </Tag>
                      <Text fontSize={14}>
                        Joined 5 days ago...
                      </Text>
                    </Box>
                  </Flex>
                </PopoverHeader>
                <PopoverArrow bg={"backgrounds.main"}/>
              </PopoverContent>
            </Popover>
          </Box>

        </Box>
      </Box>
  )
}
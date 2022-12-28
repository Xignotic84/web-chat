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
  Tag
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
            <Popover isLazy placement='bottom-start'>
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
              <PopoverContent bg={"backgrounds.secondary"}>
                <PopoverHeader fontWeight='semibold'>
                  <Box p={2} display={"flex"} alignItems={"center"}>
                    <Avatar cursor={"pointer"} size={"lg"} name={data.user.username}/>
                    <Box ml={2}>
                      <Text>
                        {data.user.username}
                      </Text>
                      <Tag size={"sm"} variant={"outline"} colorScheme={"linkedin"}>
                        {data.user.role || "Member"}
                      </Tag>
                    </Box>
                  </Box>
                </PopoverHeader>
                <PopoverArrow bg={"backgrounds.secondary"}/>
                <PopoverBody>
                  {data.user.joinedAt}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>

        </Box>
      </Box>
  )
}
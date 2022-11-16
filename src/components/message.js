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
import ProfileOverlay from "./profileOverlay";

export default function Message({data}) {
  return (
      <Box m={7}>
        <Box display={"flex"} position={"relative"}>
          <Box top={'0.5'} opacity={"70%"} right={0} position={"absolute"}>
            {new Date(data.timestamp).toDateString()}
          </Box>
          <Box>
            <Popover isLazy placement='bottom-start'>
              <Box display={"flex"}>
                <PopoverTrigger>
                  <Avatar cursor={"pointer"} size={"md"} name={data.author.username}/>
                </PopoverTrigger>
                <Box>
                  <PopoverTrigger w={"fit-content"}>
                    <Text color={"text.gray"} ml={3} cursor={"pointer"}>
                      {data.author.username}
                    </Text>
                  </PopoverTrigger>
                  <Text ml={3} whiteSpace={"pre-wrap"}>
                    {data.message}
                  </Text>
                </Box>
              </Box>
              <PopoverContent bg={"backgrounds.secondary"}>
                <PopoverHeader fontWeight='semibold'>
                  <Box p={2} display={"flex"} alignItems={"center"}>
                    <Avatar cursor={"pointer"} size={"lg"} name={data.author.username}/>
                    <Box ml={2}>
                      <Text>
                        {data.author.username}
                      </Text>
                      <Tag size={"sm"} variant={"outline"} colorScheme={"linkedin"}>
                        {data.author.role || "Member"}
                      </Tag>
                    </Box>
                  </Box>
                </PopoverHeader>
                <PopoverArrow bg={"backgrounds.secondary"}/>
                <PopoverBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>

        </Box>
      </Box>
  )
}
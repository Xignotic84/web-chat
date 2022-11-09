import {
  Avatar,
  Box,
  Button, Popover,
  PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text
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
                <Box mt={2}>
                  <PopoverTrigger>
                    <Text  color={"colors.text.gray"} ml={3} cursor={"pointer"}>
                      {data.author.username}
                    </Text>
                  </PopoverTrigger>
                  <Text ml={3} whiteSpace={"pre-wrap"}>
                    {data.message}
                  </Text>
                </Box>
              </Box>
              <PopoverContent>
                <PopoverHeader fontWeight='semibold'>
                  <Box>
                    <Avatar cursor={"pointer"} size={"lg"} name={data.author.username}/>
                    {data.author.username}
                  </Box>
                </PopoverHeader>
                <PopoverArrow/>
                <PopoverCloseButton/>
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
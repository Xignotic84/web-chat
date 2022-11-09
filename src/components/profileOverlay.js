import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  Box,
  Button,
  PopoverContent,
  Text,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody
} from "@chakra-ui/react";

export default function ProfileOverlay({children}) {
  return (
      <>
        <Popover placement='top-start'>
          <PopoverTrigger>
            <Button>Click me</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight='semibold'>Popover placement</PopoverHeader>
            <PopoverArrow/>
            <PopoverCloseButton/>
            <PopoverBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </>
  )
}
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor, Button, Flex
} from '@chakra-ui/react'
import {darkTheme} from "../themes/dark";
import {EditIcon} from "@chakra-ui/icons";
const colorKeys = Object.values(darkTheme.colors.users)

export default function ColorPicker({setColor}) {
  return (
      <Popover>
        {({isOpen, onClose}) => (
            <>
              <PopoverTrigger>
                <Button bg={"backgrounds.main"} size={"sm"}>
                  <EditIcon/>
                </Button>
              </PopoverTrigger>
              <PopoverContent p={4}>
                <PopoverArrow />
                <PopoverCloseButton />
                <Flex gap={2}>
                  {colorKeys.map((c, i) => {
                    return <Button key={i} onClick={() => {
                        setColor(c)
                        onClose()
                      }
                    } bg={c} size={"sm"}/>
                  })}
                </Flex>
              </PopoverContent>
            </>
          )}
      </Popover>
  )

}
import  {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Avatar,
  Box,
  Image,
  IconButton,
  Flex,
  Divider, Link
} from '@chakra-ui/react'
import {useState} from "react";

export default function MessageGroups({data, selected}) {
  const [isSelected, setSelectedState] = useState(selected)

  return (
    <Link href={"/rooms/1"}>
      <Card w={370} p={0} maxW='md' borderRadius={0} bg={isSelected ? "gray.200" : "none"} boxShadow={"none"}>
        <CardHeader>
          <Flex>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
              <Box>
                <Box position={"relative"}>
                  <Text color={"gray.600"} position={"absolute"} top={0} right={0}>
                    1 hour ago
                  </Text>
                </Box>
                <Heading size='sm' color={"black"}>Segun Adebayo</Heading>

                <Text color={"text.gray"} isTruncated w={200}> With Chakra UI, I wanted to sync the speed of development with the speed
                  of design. I wanted the developer to be just as excited as the designer to
                  create a screen.
                </Text>

              </Box>
            </Flex>
          </Flex>
        </CardHeader>
      </Card>
      <Divider bg={"gray.300"} margin={"0 auto"} w={"70%"}/>
    </Link>
  )
}
import {ChakraProvider, extendTheme, Box} from "@chakra-ui/react";
import {darkTheme} from '../themes/dark.js'
import {SocketProvider} from "../context/socket";
import {UserContext, UserProvider} from "../context/user";


function MyApp({Component, pageProps}) {
  return <ChakraProvider theme={extendTheme(darkTheme)}>
    <UserProvider>
      <SocketProvider>
        <Box mt={5}>
          <Component {...pageProps}/>
        </Box>
      </SocketProvider>
    </UserProvider>
  </ChakraProvider>
}

export default MyApp

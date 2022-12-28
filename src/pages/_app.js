import {ChakraProvider, extendTheme, useColorMode, Button} from "@chakra-ui/react";
import {darkTheme} from '../themes/dark.js'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {SocketProvider} from "../context/socket";



function MyApp({ Component, pageProps }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return <ChakraProvider theme={extendTheme(darkTheme)}>
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
    <SocketProvider>
      <Component {...pageProps} background={"background"} />
    </SocketProvider>
  </ChakraProvider>
}

export default MyApp

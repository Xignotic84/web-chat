import {ChakraProvider, extendTheme, useColorMode, Button} from "@chakra-ui/react";
import {darkTheme} from '../themes/dark.js'
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import {SocketProvider} from "../context/socket";
import {UserContext, UserProvider} from "../context/user";
import ProfileModal from "../components/profileModal";


function MyApp({Component, pageProps}) {
  const {colorMode, toggleColorMode} = useColorMode();

  return <ChakraProvider theme={extendTheme(darkTheme)}>
    <UserProvider>
      <SocketProvider>
        <ProfileModal/>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
        </Button>
        <Component {...pageProps} background={"background"}/>
      </SocketProvider>
    </UserProvider>
  </ChakraProvider>
}

export default MyApp

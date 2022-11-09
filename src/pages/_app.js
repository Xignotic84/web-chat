import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {darkTheme} from '../themes/dark.js'
import App from "next/app";
import Cookies from 'cookies'
import config from './../config.json'


function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={extendTheme(darkTheme)}>
    <Component {...pageProps} background={"background"} />
  </ChakraProvider>
}

export default MyApp

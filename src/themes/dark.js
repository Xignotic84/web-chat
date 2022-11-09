import {ChakraTheme, DeepPartial} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";


export const darkTheme = {
  config: {
    initialColorMode: "dark",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "#232C33")(props),
      }
    })
  },
  colors: {
    text: {
      "gray": "gray"
    },
  }
}
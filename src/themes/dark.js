import {ChakraTheme, DeepPartial} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";


export const darkTheme = {
  config: {
    initialColorMode: "dark",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "#110f18")(props),
      }
    })
  },
  colors: {
    text: {
      "gray": "#3163ED"
    },
    backgrounds: {
      secondary: "#2C302E"
    },
    users: {
      "red": "#ff6767",
      "cyan": "#61ffca",
      "orange": "#ffca85",
      "purple": "#a277ff",
      "gray": "#6d6d6d"

    }
  }
}
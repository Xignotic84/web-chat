import {ChakraTheme, DeepPartial} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";


export const darkTheme = {
  config: {
    initialColorMode: "dark",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#F2F5F9", "#1E1E2C")(props),
        color: "black",
      },
    })
  },
  colors: {
    text: {
      "gray": "gray"
    },
    backgrounds: {
      main: mode("#F2F5F9", "#1E1E2C"),
      secondary: mode("#2C302E", "red")
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
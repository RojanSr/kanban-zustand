import { extendTheme } from "@chakra-ui/react";
import { zusColor } from "./colors";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: `${zusColor.gray}`,
        margin: "0",
        minHeight: "100vh",
        fontFamily: "Helvetica",
      },
      // a: {
      //   _hover: {
      //     textDecoration: "none !important",
      //     outline: "none !important",
      //     border: "0px !important",
      //   },
      // },
    },
  },
});

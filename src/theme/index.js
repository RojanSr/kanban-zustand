import { extendTheme } from "@chakra-ui/react";
import { zusColor } from "./colors";
import backgroundImage from "../assets/svgs/background.svg";
import "@fontsource/roboto/400.css";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: `${zusColor.gray}`,
        backgroundImage: backgroundImage,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        margin: "0",
        minHeight: "100vh",
        fontFamily: `'Roboto'`,
      },
    },
  },
});

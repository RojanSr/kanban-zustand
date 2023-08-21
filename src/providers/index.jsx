import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

const Provider = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Provider;

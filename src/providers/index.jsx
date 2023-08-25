import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { theme } from "../theme";
import { router } from "../routes/routes";

const Provider = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router}>{children}</RouterProvider>
    </ChakraProvider>
  );
};

export default Provider;

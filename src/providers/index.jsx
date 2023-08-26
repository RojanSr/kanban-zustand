import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { theme } from "../theme";
import { router } from "../routes/routes";

const queryClient = new QueryClient();

const Provider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router}>{children}</RouterProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default Provider;

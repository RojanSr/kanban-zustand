import { Box } from "@chakra-ui/react";
import HomePage from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <Box as="main" minH="100vh">
      {/* <Header /> */}
      <HomePage />
    </Box>
  );
}

export default App;

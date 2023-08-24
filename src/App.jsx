import { Box } from "@chakra-ui/react";
import Column from "./components/Column";
import Header from "./components/Header";
import Stats from "./components/Stats";

function App() {
  return (
    <Box as="main" minH="100vh">
      <Header />
      <Stats />
      <Box
        className="App"
        display="flex"
        justifyContent="center"
        alignItems="start"
        py={5}
      >
        <Column state="Planned" />
        <Column state="Ongoing" />
        <Column state="Done" />
      </Box>
    </Box>
  );
}

export default App;

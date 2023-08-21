import { Box } from "@chakra-ui/react";
import Column from "./components/Column";

function App() {
  return (
    <>
      <Box
        className="App"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="start"
      >
        <Column state="Planned" />
        <Column state="Ongoing" />
        <Column state="Done" />
      </Box>
    </>
  );
}

export default App;

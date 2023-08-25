import React from "react";
import Stats from "../../components/Stats";
import { Box } from "@chakra-ui/react";
import Column from "../../components/Column";
import UserProgress from "../Progress";

const HomePage = () => {
  return (
    <>
      <Stats />
      <UserProgress />
      <Box
        className="App"
        display="flex"
        justifyContent="center"
        alignItems="start"
        flexWrap="wrap"
        gap="1.2rem"
        py={5}
      >
        <Column state="Planned" />
        <Column state="Ongoing" />
        <Column state="Done" />
      </Box>
    </>
  );
};

export default HomePage;

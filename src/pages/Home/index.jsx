import React from "react";
import Stats from "../../components/Stats/Stats";
import { Box } from "@chakra-ui/react";
import Column from "../../components/Column/Column";
import UserProgress from "../Progress";
import AdviceCard from "../../components/Advice";

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
      <Box display="flex" justifyContent="center" mt={8}>
        <AdviceCard />
      </Box>
    </>
  );
};

export default HomePage;

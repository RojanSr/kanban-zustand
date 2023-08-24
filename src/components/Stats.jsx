import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useStore } from "../store";

const Stats = () => {
  const completedTask = useStore((store) => store.completedTasks);
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={8}>
      <Text color="#fff" fontSize="18px">
        Tasks completed so far:{" "}
        <Text as="span" color="lightgreen" fontWeight="600">
          {completedTask.length}
        </Text>
      </Text>
    </Box>
  );
};

export default Stats;

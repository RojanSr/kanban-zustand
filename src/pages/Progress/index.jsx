import React from "react";
import { useStore } from "../../store";
import { Box, Progress, Text } from "@chakra-ui/react";

const UserProgress = () => {
  const completedTasks = useStore((store) => store.completedTasks);

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt="30px"
      alignItems="center"
      gap="10px"
    >
      <Progress
        size="md"
        width="500px"
        borderRadius="8px"
        value={completedTasks.length}
      />
      <Text color="white">{completedTasks.length}%</Text>
    </Box>
  );
};

export default UserProgress;

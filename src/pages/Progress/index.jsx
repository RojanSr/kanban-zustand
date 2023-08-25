import React, { useEffect } from "react";
import { useStore } from "../../store";
import { Box, Progress, Text } from "@chakra-ui/react";

const UserProgress = () => {
  const completedTasks = useStore((store) => store.completedTasks);
  const level = useStore((store) => store.progress.level);
  const setLevel = useStore((store) => store.setLevel);
  const threshold = useStore((store) => store.progress.threshold);
  const incrementThreshold = useStore((store) => store.incrementThreshold);
  const incrementIncr = useStore((store) => store.incrementIncr);
  const percentage = useStore((store) => store.progress.percentage);
  const incrementPercentage = useStore((store) => store.incrementPercentage);

  useEffect(() => {
    if (completedTasks.length >= threshold) {
      incrementIncr();
      setLevel();
      incrementThreshold();
    }
    let per = (completedTasks.length / threshold) * 100;
    if (per === 100) {
      per = 0;
    }
    incrementPercentage(per);
  }, [completedTasks.length]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap="10px"
    >
      <Text color="#fff" fontSize="16px">
        Level {level}
      </Text>
      <Box display="flex" alignItems="center" gap="10px">
        <Progress
          size="md"
          width="500px"
          borderRadius="8px"
          value={percentage}
        />
        <Text color="white">{parseInt(percentage)}%</Text>
      </Box>
    </Box>
  );
};

export default UserProgress;

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
  const setTasksCompletedInRange = useStore(
    (store) => store.setTasksCompletedInRange
  );
  const taskCompletedInRange = useStore(
    (store) => store.progress.taskCompletedInRange
  );
  const range = useStore((store) => store.progress.range);
  const setRange = useStore((store) => store.setRange);
  const prevThreshold = useStore((store) => store.progress.prevThreshold);

  function updatePercentage() {
    let per = (taskCompletedInRange / range) * 100;
    if (per === 100) {
      per = 0;
    }
    incrementPercentage(per);
  }

  useEffect(() => {
    if (completedTasks.length >= threshold) {
      incrementIncr();
      setLevel();
      incrementThreshold();
    }
    // Show how many tasks is completed in prevThreshold and current Threshold range
    setTasksCompletedInRange(completedTasks.length - prevThreshold);
    updatePercentage();
  }, [completedTasks.length]);

  useEffect(() => {
    let thresRange = threshold - prevThreshold;
    setRange(thresRange);
  }, [threshold]);

  useEffect(() => {
    updatePercentage();
  }, [taskCompletedInRange]);

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
          isAnimated
          hasStripe
        />
        <Text color="white">{parseInt(percentage)}%</Text>
      </Box>
    </Box>
  );
};

export default UserProgress;

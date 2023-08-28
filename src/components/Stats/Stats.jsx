import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useStore } from "../../store";
import { zusColor } from "../../theme/colors";

const Stats = () => {
  const completedTask = useStore((store) => store.completedTasks);
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={8}>
      <Box
        bg={zusColor.grayDark}
        color={zusColor.text}
        px={3}
        py={2}
        borderRadius="12px"
      >
        <Text fontSize="18px">
          Tasks completed so far:{" "}
          <Text as="span" color={zusColor.done} fontWeight="700">
            {completedTask.length}
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Stats;

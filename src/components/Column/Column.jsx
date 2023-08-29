import {
  Box,
  keyframes,
  usePrefersReducedMotion,
  Text,
  Circle,
} from "@chakra-ui/react";
import { zusColor } from "../../theme/colors";
import Task from "../Task/Task";
import { useStore } from "../../store";
import { useRef, useState } from "react";
import AddTask from "./AddTask";
import { AddIcon } from "@chakra-ui/icons";

const pulsate = keyframes`
from {box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.2);}
to {box-shadow: 0 0 0 14px rgba(255, 255, 255, 0);}
`;

export default function Column({ state }) {
  const [drop, setDrop] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.status === state)
  );

  const setDraggedTask = useStore((store) => store.setDraggedTask);

  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const addTaskRef = useRef(null);

  function toggleOpen() {
    addTaskRef.current.openModal();
  }

  function findProgress() {
    let progress;
    progress = state === "Done" ? 100 : 0;
    return progress;
  }

  let statusColor;
  switch (state) {
    case "Planned":
      statusColor = zusColor.planned;
      break;
    case "Ongoing":
      statusColor = zusColor.ongoing;
      break;
    case "Done":
      statusColor = zusColor.done;
      break;
    default:
      statusColor = zusColor.planned;
  }

  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion ? undefined : `${pulsate} 2s infinite`;
  return (
    <Box
      bg={zusColor.grayDark}
      minH="20rem"
      color="#fff"
      width="33%"
      maxW="20rem"
      minW="16rem"
      borderRadius="12px"
      padding="0.5rem"
      border="dashed 4px transparent"
      borderColor={drop && draggedTask?.status ? "white" : "transparent"}
      boxShadow="0px 17px 36px -8px rgba(0,0,0,0.75)"
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        moveTask(draggedTask.title, state, findProgress(), draggedTask.id);
        setDraggedTask(null);
        setDrop(false);
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        p={1}
        alignItems="center"
      >
        <Box display="flex" alignItems="center" gap="8px">
          <Box
            w="20px"
            h="20px"
            bg={statusColor}
            borderRadius="50%"
            animation={tasks.length ? animation : "none"}
          ></Box>
          <Text fontSize="18px" fontWeight="700">
            {state}
          </Text>
        </Box>
        {/* <Button size="sm" _hover={{ bg: zusColor.grayLight }}>
          Add
        </Button> */}
        <Circle
          onClick={toggleOpen}
          cursor="pointer"
          p={1.5}
          _hover={{ background: zusColor.gray }}
          transition="0.1s ease-in"
        >
          <AddIcon />
        </Circle>
      </Box>

      {tasks.reverse().map((task) => (
        <Task id={task.id} key={task.id} />
      ))}

      <AddTask toggleOpen={toggleOpen} ref={addTaskRef} state={state} />
    </Box>
  );
}

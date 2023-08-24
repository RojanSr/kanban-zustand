import { Box, Button, Input, Text } from "@chakra-ui/react";
import { zusColor } from "../theme/colors";
import Task from "./Task";
import { useStore } from "../store";
import { useEffect, useRef, useState } from "react";
import AddTask from "./AddTask";

export default function Column({ state }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.status === state)
  );

  const setDraggedTask = useStore((store) => store.setDraggedTask);

  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const inpRef = useRef(null);

  useEffect(() => {
    if (open) {
      inpRef.current.focus();
    }
  }, [open]);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  function findProgress() {
    let progress;
    switch (state) {
      case "Planned":
        progress = 0;
        break;
      case "Ongoing":
        progress = null;
        break;
      case "Done":
        progress = 100;
        break;
      default:
        progress = 0;
    }
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

  return (
    <Box
      bg={zusColor.grayDark}
      minH="20rem"
      color="#fff"
      width="33%"
      maxW="20rem"
      mx="0.5rem"
      borderRadius="12px"
      padding="0.5rem"
      border="dashed 4px transparent"
      borderColor={drop ? "white" : "transparent"}
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
          <Box w="20px" h="20px" bg={statusColor} borderRadius="50%"></Box>
          <Text fontSize="18px" fontWeight="700">
            {state}
          </Text>
        </Box>
        <Button
          size="sm"
          _hover={{ bg: zusColor.grayLight }}
          onClick={toggleOpen}
        >
          Add
        </Button>
      </Box>

      {tasks.map((task) => (
        <Task id={task.id} key={task.id} />
      ))}

      {open && <AddTask toggleOpen={toggleOpen} ref={inpRef} state={state} />}
    </Box>
  );
}

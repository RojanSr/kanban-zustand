import { Box, Button, Input, Text } from "@chakra-ui/react";
import { zusColor } from "../theme/colors";
import Task from "./Task";
import { useStore } from "../store";
import { useState } from "react";

export default function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.status === state)
  );

  const setDraggedTask = useStore((store) => store.setDraggedTask);

  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const addTask = useStore((store) => store.addTask);

  return (
    <Box
      bg={zusColor.grayDark}
      minH="20rem"
      color="#fff"
      width="33%"
      maxW="20rem"
      mx="0.5rem"
      borderRadius="4px"
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
        moveTask(draggedTask, state);
        setDraggedTask(null);
        setDrop(false);
      }}
    >
      <Box display="flex" justifyContent="space-between" p={1}>
        <Text>{state}</Text>
        <Button
          size="sm"
          _hover={{ bg: zusColor.grayLight }}
          onClick={() => setOpen((prev) => !prev)}
        >
          Add
        </Button>
      </Box>

      {/* <Task title="Todo" /> */}
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}

      {open && (
        <Box
          position="absolute"
          top="48%"
          left="50%"
          transform="translateX(-50%)"
          bg="rgba(0,0,0,0.3)"
          p={4}
          borderRadius="6px"
        >
          <Box>
            <Input
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></Input>
            <Button
              onClick={() => {
                if (text.trim() !== "") {
                  addTask(text, state);
                  setText("");
                  setOpen(false);
                }
              }}
              size="sm"
              mt={4}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

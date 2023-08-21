import { Box } from "@chakra-ui/react";
import { zusColor } from "../theme/colors";
import { useStore } from "../store";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  function statusFun() {
    switch (task.status) {
      case "Planned":
        return zusColor.grayLight;
      case "Ongoing":
        return zusColor.ongoing;
      case "Done":
        return zusColor.done;
      default:
        return zusColor.grayLight;
    }
  }
  return (
    <Box
      bg="white"
      color="black"
      borderRadius="4px"
      minH="5rem"
      p="0.5rem"
      display="flex"
      flexDirection="column"
      alignItems="space-between"
      justifyContent="space-between"
      mb={1}
      cursor="move"
      draggable
      onDragStart={() => {
        setDraggedTask(task.title);
      }}
    >
      <Box>{task.title}</Box>
      <Box display="flex" justifyContent="space-between">
        <Box onClick={() => deleteTask(task.title)} cursor="pointer">
          <DeleteIcon />
        </Box>
        <Box fontSize="small" bg={statusFun} p={1} borderRadius="4px">
          {task.status}
        </Box>
      </Box>
    </Box>
  );
}

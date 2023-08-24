import React, { useEffect, useState } from "react";
import { Box, Progress, background } from "@chakra-ui/react";
import { zusColor } from "../theme/colors";
import { useStore } from "../store";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfettiExplosion from "react-confetti-explosion";
import TaskCompletedSfx from "../assets/sounds/TaskCompleted.mp3";

export default function Task({ id }) {
  const audio = new Audio(TaskCompletedSfx);
  const [done, setDone] = useState(false);
  const task = useStore((store) => store.tasks.find((task) => task.id === id));

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);
  const setCompletedTasks = useStore((store) => store.setCompletedTasks);
  const completedTasks = useStore((store) => store.completedTasks);
  const removeCompletedTask = useStore((store) => store.removeCompletedTask);

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

  useEffect(() => {
    // console.log("i run once");
    // Array of task id with status "Done"
    const completedTasksId = completedTasks.map((el) => el.id);
    if (task.status === "Done") {
      audio.play();

      // Synchronize audio with confetti
      setTimeout(() => {
        setDone(true);
      }, 1000);

      // Add Done task to completedTask object only if it doesn't already exist. Useful to remove duplicate elements
      if (!completedTasksId.includes(task.id)) {
        setCompletedTasks(task.title, task.id);
      }
    } else {
      // Check if task status is changed from "Done" to either "Planned" or "Ongoing"
      if (completedTasksId.includes(task.id)) {
        removeCompletedTask(task.id);
      }
    }
  }, [task.status]);

  return (
    <Box
      bg="white"
      color="black"
      borderRadius="6px"
      minH="5rem"
      p="0.5rem"
      display="flex"
      flexDirection="column"
      alignItems="space-between"
      justifyContent="space-between"
      mb={1}
      my={2}
      cursor="move"
      draggable
      onDragStart={() => {
        setDraggedTask(task.title, task.id);
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>{task.title}</Box>
        {task.status === "Ongoing" && (
          <Box cursor="pointer">
            <EditIcon />
          </Box>
        )}
      </Box>
      <Progress
        value={task.progress}
        my={1}
        size="sm"
        isIndeterminate={task.status === "Ongoing" ? true : false}
      />
      <Box display="flex" justifyContent="space-between">
        <Box onClick={() => deleteTask(task.id)} cursor="pointer">
          <DeleteIcon />
        </Box>
        <Box
          fontSize="16px"
          bg={statusFun}
          p={1}
          borderRadius="4px"
          fontWeight="500"
        >
          {task.status}
        </Box>
      </Box>

      {done && <ConfettiExplosion />}
    </Box>
  );
}

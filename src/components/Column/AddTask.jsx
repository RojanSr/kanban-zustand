import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import { useStore } from "../../store";
import { TbLayoutKanban } from "react-icons/tb";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { zusColor } from "../../theme/colors";

const AddTask = forwardRef((props, ref) => {
  const [text, setText] = useState("");

  const addTask = useStore((store) => store.addTask);

  function handleSubmit() {
    if (text.trim() !== "") {
      let progressVal;
      switch (props.state) {
        case "Planned":
          progressVal = 0;
          break;
        case "Ongoing":
          progressVal = null;
          break;
        case "Done":
          progressVal = 100;
          break;
        default:
          progressVal = 0;
      }
      addTask(text, props.state, progressVal, crypto.randomUUID());
      setText("");
      props.toggleOpen();
    }
  }

  function handleClose() {
    setText("");
    props.toggleOpen();
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
    if (e.key === "Escape") {
      handleClose();
    }
  }
  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      bg="#00171F"
      p={4}
      borderRadius="6px"
      onKeyUp={handleKeyPress}
      zIndex="9"
    >
      <Box display="flex" w="inherit" justifyContent="center" mb={2}>
        <Text fontSize="18px" fontWeight="700">
          Add Task
        </Text>
      </Box>
      <Box>
        <Input
          onChange={(e) => setText(e.target.value)}
          value={text}
          ref={ref}
          my={4}
        ></Input>
        <Box
          display="flex"
          alignItems="center"
          gap="12px"
          justifyContent="center"
        >
          <Button
            onClick={handleSubmit}
            size="sm"
            mt={4}
            colorScheme="green"
            _hover={{ transform: "scale(1.1)", transition: "0.2s ease-in-out" }}
          >
            <CheckIcon boxSize={4} />
          </Button>
          <Button
            onClick={handleClose}
            size="sm"
            mt={4}
            colorScheme="red"
            _hover={{ transform: "scale(1.1)", transition: "0.2s ease-in-out" }}
          >
            <CloseIcon boxSize={4} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
});

export default AddTask;

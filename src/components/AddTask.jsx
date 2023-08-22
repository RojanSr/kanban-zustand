import { Box, Button, Input } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import { useStore } from "../store";

const AddTask = forwardRef((props, ref) => {
  const [text, setText] = useState("");

  const addTask = useStore((store) => store.addTask);

  function handleSubmit() {
    if (text.trim() !== "") {
      addTask(text, props.state);
      setText("");
      props.toggleOpen();
    }
  }

  function handleClose() {
    setText("");
    props.toggleOpen();
  }
  return (
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
          ref={ref}
        ></Input>
        <Box display="flex" alignItems="center" gap="12px">
          <Button onClick={handleSubmit} size="sm" mt={4}>
            Submit
          </Button>
          <Button onClick={handleClose} size="sm" mt={4}>
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
});

export default AddTask;

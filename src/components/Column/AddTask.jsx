import {
  Box,
  Button,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  FormControl,
} from "@chakra-ui/react";
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import { useStore } from "../../store";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { zusColor } from "../../theme/colors";

const AddTask = forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [text, setText] = useState("");

  const addTask = useStore((store) => store.addTask);

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal() {
          onOpen();
        },
      };
    },
    []
  );

  function handleSubmit(e) {
    e.preventDefault();
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
      onClose();
    }
  }

  function handleClose() {
    setText("");
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent
          top="25%"
          bg="#00171F"
          p={4}
          borderRadius="6px"
          zIndex="9"
          w="300px"
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box display="flex" justifyContent="center" mb={2}>
              <Text fontSize="18px" fontWeight="700" color={zusColor.text}>
                Add Task
              </Text>
            </Box>
            <Box>
              <Input
                onChange={(e) => setText(e.target.value)}
                value={text}
                ref={initialRef}
                my={2}
                placeholder="Enter Task Here"
                _placeholder={{
                  color: zusColor.text,
                  opacity: 0.4,
                }}
                color={zusColor.text}
                focusBorderColor={zusColor.ongoing}
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
                  _hover={{
                    transform: "scale(1.1)",
                    transition: "0.2s ease-in-out",
                  }}
                >
                  <CheckIcon boxSize={4} />
                </Button>
                <Button
                  onClick={handleClose}
                  size="sm"
                  mt={4}
                  colorScheme="red"
                  _hover={{
                    transform: "scale(1.1)",
                    transition: "0.2s ease-in-out",
                  }}
                >
                  <CloseIcon boxSize={4} />
                </Button>
              </Box>
            </Box>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
});

export default AddTask;

import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { zusColor } from "../../theme/colors";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const doneMessages = [
  { header: "Great Job!", msg: "Don't forget to hydrate yourself" },
  {
    header: "You're Doing Great",
    msg: "Never gonna give you up, Never gonna let you down",
  },
  { header: "Brilliant!", msg: "Consider taking a break." },
  { header: "Nice Job!", msg: "Go for a walk" },
];

const FactCard = (props) => {
  async function fetchFunFact() {
    const res = await axios.get("https://api.api-ninjas.com/v1/facts?limit=1", {
      headers: {
        "X-Api-Key": import.meta.env.VITE_API_NINJA_KEY,
      },
    });
    return res.data[0];
  }

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["funFactData"],
    queryFn: fetchFunFact,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (props.open) {
      onOpen();
    }
  }, []);

  return (
    <Box>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={zusColor.grayDark}
          color={zusColor.text}
          borderRadius="12px"
          zIndex={9}
          position="fixed"
          top="30%"
          transform="translate(50%, -50%)"
        >
          <ModalHeader mb={-4}>
            {
              doneMessages[Math.floor(Math.random() * doneMessages.length)]
                .header
            }
          </ModalHeader>
          <Box px={5} my={2}>
            <Divider />
          </Box>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isLoading || isFetching ? (
              <Spinner my={2} />
            ) : isError ? (
              <Text color="red.400">
                Error Encountered. Try checking your internet connnection
              </Text>
            ) : (
              <>
                <Text fontSize="15px" as="i">
                  {
                    doneMessages[
                      Math.floor(Math.random() * doneMessages.length)
                    ].msg
                  }
                </Text>
                <Text mt={3} fontSize="14px">
                  <Text as="span" fontWeight="600" color={zusColor.done}>
                    Fun Fact:{" "}
                  </Text>
                  {data?.fact}
                </Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FactCard;

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
  "Great Job!",
  "You're Doing Great",
  "Brilliant!",
  "Nice Job!",
];

const FactCard = (props) => {
  async function fetchFunFact() {
    const res = await axios.get("https://api.api-ninjas.com/v1/facts?limit=1", {
      headers: {
        "X-Api-Key": import.meta.env.VITE_QUOTE_API_KEY,
      },
    });
    return res.data[0];
  }

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["funFactData"],
    queryFn: fetchFunFact,
    staleTime: 60 * 1000, // 1 minute
    cacheTime: Infinity,
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
            {doneMessages[Math.floor(Math.random() * doneMessages.length)]}
          </ModalHeader>
          <Box px={5} my={2}>
            <Divider />
          </Box>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize="16px">Cool your brain with a fun fact</Text>

            {isLoading || isFetching ? (
              <Spinner />
            ) : (
              <Text mt={3} fontSize="14px">
                <Text as="span" fontWeight="600" color={zusColor.done}>
                  Fun Fact:{" "}
                </Text>
                {data?.fact}
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FactCard;

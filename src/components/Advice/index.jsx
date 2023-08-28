import { Box, Center, Divider, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { BsFillDice5Fill, BsPauseFill } from "react-icons/bs";
import React from "react";
import axios from "axios";
import AdviceSkeleton from "./Skeleton";
import { RepeatIcon } from "@chakra-ui/icons";

const AdviceCard = () => {
  async function fetchAdvice() {
    try {
      const config = {
        headers: {
          "X-Api-Key": import.meta.env.VITE_QUOTE_API_KEY,
        },
      };
      const res = await axios.get(
        "https://api.api-ninjas.com/v1/quotes?category=inspirational",
        config
      );
      return res.data[0];
    } catch (error) {
      console.log(error);
    }
  }

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["adviceData"],
    queryFn: fetchAdvice,
    staleTime: 60 * 1000, // 1 minute
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexDirection="column"
      bg="hsl(217, 19%, 24%)"
      borderRadius="12px"
      color="#fff"
      py={6}
      px={6}
      maxW={{ base: "290px", md: "420px" }}
      minW={{ base: "270px", md: "380px" }}
      minH="150px"
      position="relative"
    >
      {isFetching || isLoading ? (
        <AdviceSkeleton />
      ) : isError ? (
        <>
          <Text color="red.400">
            Unable to reach. Please try checking you internet connection
          </Text>
          <RepeatIcon
            onClick={refetch}
            fontSize="22px"
            mt={3}
            cursor="pointer"
          />
        </>
      ) : (
        <>
          <Text color="hsl(150, 100%, 66%)" fontSize="12px" letterSpacing="1px">
            {data?.author ? data?.author : "Anonymous"}
          </Text>
          <Text
            as="q"
            color="hsl(193, 38%, 86%)"
            fontSize="18px"
            fontWeight="700"
            lineHeight="7"
            mt={2}
            mb={1}
          >
            {data?.quote?.length > 200
              ? refetch()
              : data?.quote?.replace(/[!@#$^*]/g, "")}
          </Text>
          <Box display="flex" alignItems="center" width="100%">
            <Divider />
            <BsPauseFill color="hsl(193, 38%, 86%)" fontSize="52px" />
            <Divider />
          </Box>
          <Center
            position="absolute"
            bottom="-25px"
            right="50%"
            transform="translateX(50%)"
            bg="hsl(150, 100%, 66%)"
            color="#fff"
            w="40px"
            h="40px"
            borderRadius="50%"
            cursor="pointer"
            _hover={{
              background: "hsl(150, 100%, 40%)",
            }}
            onClick={refetch}
          >
            <BsFillDice5Fill color="#000" />
          </Center>
        </>
      )}
    </Box>
  );
};

export default AdviceCard;

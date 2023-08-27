import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { BsFillDice5Fill } from "react-icons/bs";
import React from "react";
import axios from "axios";

const AdviceCard = () => {
  async function fetchAdvice() {
    const res = await axios.get("https://api.themotivate365.com/stoic-quote");
    return res.data;
  }

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["adviceData"],
    queryFn: fetchAdvice,
    staleTime: 60 * 1000, // 1 minute
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isFetching || isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        bg="hsl(217, 19%, 24%)"
        borderRadius="12px"
        py={6}
        px={4}
        maxW={{ base: "290px", md: "420px" }}
        minH="150px"
        minW={{ base: "270px", md: "380px" }}
      >
        <Spinner color="hsl(193, 38%, 86%)" size="lg" />
      </Box>
    );
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      textAlign="center"
      flexDirection="column"
      bg="hsl(217, 19%, 24%)"
      gap="16px"
      borderRadius="12px"
      color="#fff"
      py={6}
      px={4}
      maxW={{ base: "290px", md: "420px" }}
      minW={{ base: "270px", md: "380px" }}
      position="relative"
    >
      <Text color="hsl(150, 100%, 66%)" fontSize="12px" letterSpacing="1px">
        {data.author ? data.author : "Anonymous"}
      </Text>
      <Text
        as="q"
        color="hsl(193, 38%, 86%)"
        fontSize="18px"
        fontWeight="700"
        lineHeight="7"
      >
        {data.quote.replace(/[!@#$^*]/g, "")}
      </Text>
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
    </Box>
  );
};

export default AdviceCard;

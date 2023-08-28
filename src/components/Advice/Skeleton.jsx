import { Box, Skeleton } from "@chakra-ui/react";

const AdviceSkeleton = () => {
  return (
    <Box
      display="flex"
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
      <Skeleton height="6px" w="50px" mb={4} />
      <Skeleton height="12px" w="100%" mt={2} mb={1} />
      <Skeleton height="12px" w="100%" mt={2} mb={1} />
      <Skeleton height="12px" w="100%" mt={2} mb={1} />
    </Box>
  );
};

export default AdviceSkeleton;

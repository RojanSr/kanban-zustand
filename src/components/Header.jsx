import React from "react";
import {
  Box,
  Link,
  ListItem,
  Text,
  UnorderedList,
  transition,
} from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";

const Header = () => {
  return (
    <Box as="header">
      <Box
        as="nav"
        display="flex"
        justifyContent="space-between"
        px={12}
        py={5}
        bg="blackAlpha.600"
        color="whiteAlpha.700"
        fontWeight="700"
      >
        <Text fontSize="24px">Kanban App 📚</Text>
        <UnorderedList
          listStyleType="none"
          display="flex"
          alignItems="center"
          gap="35px"
          fontSize="18px"
          fontWeight="600"
        >
          <ListItem>
            <Link href="/">Home</Link> 🏠
          </ListItem>
          <ListItem>
            <Link href="/">Your Progress</Link> 🏗️
          </ListItem>
          <ListItem>
            <Link
              href="https://www.github.com/RojanSr"
              isExternal
              _hover={{
                transform: "scale(1.1)",
                transition: "0.3s ease-in",
              }}
            >
              <BsGithub fontSize="36px" />
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Header;

import React from "react";
import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsGithub, BsFillJournalBookmarkFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { GiNetworkBars } from "react-icons/gi";
import { kanban_routes } from "../routes/routes.constant";
import { SettingsIcon } from "@chakra-ui/icons";

const Header = () => {
  const navItems = [
    {
      name: "Home",
      id: crypto.randomUUID(),
      icon: <AiFillHome />,
      path: kanban_routes.HOME,
    },
    {
      name: "Your Progress",
      id: crypto.randomUUID(),
      icon: <GiNetworkBars />,
      path: kanban_routes.PROGRESS,
    },
    {
      name: "Settings",
      id: crypto.randomUUID(),
      icon: <SettingsIcon />,
      path: kanban_routes.SETTINGS,
    },
  ];
  return (
    <Box as="header">
      <Box
        as="nav"
        display="flex"
        justifyContent="space-between"
        px={{ base: 5, md: 12 }}
        py={5}
        bg="blackAlpha.600"
        color="whiteAlpha.700"
        fontWeight="700"
      >
        <Box display="flex" alignItems="center" gap="12px">
          <BsFillJournalBookmarkFill fontSize="22px" />
          <Text fontSize={{ base: "16px", md: "24px" }}>Kanban App</Text>
        </Box>
        <UnorderedList
          listStyleType="none"
          display="flex"
          alignItems="center"
          gap={{ base: "25px", md: "35px" }}
          fontSize="18px"
          fontWeight="600"
        >
          {navItems.map((item) => (
            <ListItem key={item.id}>
              <Link
                to={item.path}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Text display={{ base: "none", md: "block" }}>{item.name}</Text>
                {item.icon}
              </Link>
            </ListItem>
          ))}
          <ListItem>
            <Link to="https://www.github.com/RojanSr" target="_blank">
              <BsGithub fontSize="30px" />
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Header;

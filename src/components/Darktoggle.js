import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

function Darktoggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      variant="ghost"
      size="lg"
      ml={2}
      fontSize="2xl" // Automatically adjusts icon size
      color={colorMode === "light" ? "blue.600" : "yellow.400"} // Example colors
    />
  );
}

export default Darktoggle;

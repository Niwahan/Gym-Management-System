import React from "react";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import {
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function Dashboard() {
  return (
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
      <Header title="Dashboard" subtitle="Welcome to your dashboard" />
    </FlexBetween>
    </Box>
);
}

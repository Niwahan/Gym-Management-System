import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";

export default function Members() {
  return (<>
    <Box m="1.5rem 2.5rem">
      <Header title="Members" subtitle="See your list of members." />
    </Box>
    <Button>Create Members</Button>
    </>
  );
}

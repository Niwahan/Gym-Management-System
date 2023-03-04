import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

export default function Header({ title, subtitle, button }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          variant="h2"
          color={theme.palette.secondary[100]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={theme.palette.secondary[300]}>
          {subtitle}
        </Typography>
      </Box>
      {button && <span color="primary">{button}</span>}
    </Box>
  );
}

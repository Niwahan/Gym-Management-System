import React from 'react'
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", paddingTop: 100 }}>
    <Typography variant="h1" gutterBottom>
      404 - Page not found
    </Typography>
    <Typography variant="body1" gutterBottom>
      The page you are looking for does not exist.
    </Typography>
    <Button component={Link} to="/" variant="contained" color="primary">
      Go back to the homepage
    </Button>
  </div>
  )
}

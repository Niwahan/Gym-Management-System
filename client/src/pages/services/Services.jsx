import React from "react";
import { Box, Button } from "@mui/material";
import Header from "components/Header";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Services"
          subtitle="See and manage your services available."
          button={
            <Button component={Link} to="/add-services" variant="contained">
              Add Services
            </Button>
          }
        />
      </Box>
    </>
  );
}

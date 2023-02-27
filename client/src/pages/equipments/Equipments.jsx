import React from "react";
import { Box, Button } from "@mui/material";
import Header from "components/Header";
import { Link } from "react-router-dom";

export default function Equipments() {
  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Equipments"
          subtitle="See and manage your list of equipments."
          button={
            <Button component={Link} to="/add-equipments" variant="contained">
              Add Equipments
            </Button>
          }
        />
      </Box>
    </>
  );
}

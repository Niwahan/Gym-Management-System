import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
} from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

export default function Members() {

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Full Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
    },
    {
      field: "experience",
      headerName: "Experience",
      flex: 1,
    },
  ];
  return (<>
    <Box m="1.5rem 2.5rem">
      <Header title="Members" subtitle="View and manage list of members."  button={
            <Button component={Link} to="/add-members" variant="contained">
              Add members
            </Button>
          } />
    </Box>
    <Box mt="40px" height="75vh">
          {/* {error && <Alert severity="error">{error}</Alert>}
          {loading && <CircularProgress />} */}
            <DataGrid
              // loading={loading || !trainers}
              getRowId={(row) => row._id}
              rows={[]}
              columns={columns}
            />
        </Box>
    </>
  );
}

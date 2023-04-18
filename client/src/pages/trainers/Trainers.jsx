import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getTrainers } from "state/actions/trainerActions";

export default function Trainers() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/loginRequired");
    }
    else if (userInfo.role === "member" || userInfo.role === "trainer") {
      navigate("/unauthorized");
    }
  }, [userInfo, navigate]);

  const listTrainers = useSelector((state) => state.trainers);
  const { loading, error, trainersInfo } = listTrainers;

  useEffect(() => {
    dispatch(getTrainers());
  }, [dispatch]);

  const columns = [
    {
      field: "name",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (trainersInfo) => trainersInfo.row.user.name,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (trainersInfo) => trainersInfo.row.user.email,
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
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(`/trainers/${params.row._id}`);
          }}
        >
          More Info{" "}
        </Button>
      ),
    },
  ];
  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Trainers"
          subtitle="See your list of trainers."
          button={
            <Button
              component={Link}
              to="/trainers/add-trainers"
              variant="contained"
            >
              Add Trainers
            </Button>
          }
        />
        <Box
          mt="40px"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "&. MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "&. MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "&. MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={loading || !trainersInfo}
            error={error}
            getRowId={(row) => row._id}
            rows={trainersInfo || []}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 15, 20]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  );
}

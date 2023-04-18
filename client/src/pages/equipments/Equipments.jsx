import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Header from "components/Header";
import { getEquipments } from "state/actions/equipmentActions";

export default function Equipments() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/loginRequired");
    } else if (userInfo.role === "member" || userInfo.role === "trainer") {
      navigate("/unauthorized");
    }
  }, [userInfo, navigate]);

  const listEquipments = useSelector((state) => state.equipments);
  const { loading, error, equipmentsInfo } = listEquipments;

  useEffect(() => {
    dispatch(getEquipments());
  }, [dispatch]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
    },
    {
      field: "purchasedDate",
      headerName: "Purchased Date",
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
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
            navigate(`/equipments/${params.row._id}`);
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
          title="Equipments"
          subtitle="See and manage your list of equipments."
          button={
            <Button
              component={Link}
              to="/equipments/add-equipments"
              variant="contained"
            >
              Add Equipments
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
            loading={loading || !equipmentsInfo}
            error={error}
            getRowId={(row) => row._id}
            rows={equipmentsInfo || []}
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

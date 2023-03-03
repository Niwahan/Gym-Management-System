import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "state/actions/memberActions";
import { useState } from "react";

export default function Attendance() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  const listMembers = useSelector((state) => state.members);
  const { loading, error, membersInfo } = listMembers;

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   flex: 0.5,
    // },
    {
      field: "name",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (membersInfo) => membersInfo.row.user.name,
    },
    {
      field: "service",
      headerName: "Service",
      flex: 1,
      valueGetter: (membersInfo) => membersInfo.row.service.name,
    },
    {
      field: "attendanceCount",
      headerName: "Attendance Count",
      flex: 0.5
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
            navigate(`/members/${params.row._id}`);
          }}
        >
          More Info{" "}
        </Button>
      ),
    },
  ];
  function getCurrentDate() {
    return new Date();
}
  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Attendance" subtitle="" />
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
            loading={loading || !membersInfo}
            error={error}
            getRowId={(row) => row._id}
            rows={membersInfo || []}
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

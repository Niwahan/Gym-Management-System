import React, { useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "state/actions/memberActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MembersProgress() {
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
    {
      field: "name",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (membersInfo) => membersInfo.row.user.name,
    },
    {
      field: "initialWeight",
      headerName: "Initial Weight (kg)",
      flex: 0.5,
      valueGetter: (params) => {
        return params.row.initialWeight ? params.row.initialWeight : 0;
      },
    },
    {
      field: "finalWeight",
      headerName: "Final Weight (kg)",
      flex: 0.5,
      valueGetter: (params) => {
        return params.row.finalWeight ? params.row.finalWeight : 0;
      },
    },
    {
      field: "initialBodyType",
      headerName: "Initial Body Type",
      flex: 0.5,
      valueGetter: (params) => {
        return params.row.initialBodyType ? params.row.initialBodyType : "Not Registered Yet";
      }
    },
    {
      field: "finalBodyType",
      headerName: "Final Body Type",
      flex: 0.5,
      valueGetter: (params) => {
        return params.row.finalBodyType ? params.row.finalBodyType : "Not Registered Yet";
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(`/members_progress/${params.row._id}`);
          }}
        >
          Go to member
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Members Progress" subtitle="" />
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
          />
        </Box>
      </Box>
    </>
  );
}

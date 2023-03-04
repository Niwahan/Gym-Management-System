import React, { useEffect } from "react";
import { Box, Button, useTheme, CircularProgress, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "state/actions/memberActions";
import { Link as RouterLink } from "react-router-dom";
// import {
//   getMembers,
//   updateMemberInitialWeight,
//   updateMemberFinalWeight,
//   updateMemberBodyType,
// } from "state/actions/memberActions";
import { useState } from "react";

export default function MembersProgress() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [initialWeightEdit, setInitialWeightEdit] = useState(false);
  const [finalWeightEdit, setFinalWeightEdit] = useState(false);
  const [bodyTypeEdit, setBodyTypeEdit] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const [initialWeight, setInitialWeight] = useState(0);
  const [finalWeight, setFinalWeight] = useState(0);
  const [bodyType, setBodyType] = useState("");

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
      editable: true,
      valueGetter: (params) => params.row.initialWeight,
      valueSetter: (params) => {
        const newValue = parseFloat(params.newValue);
        // if (isNaN(newValue)) {
        //   return false;
        // }
        // dispatch(
        //   updateMemberInitialWeight(params.id, newValue, membersInfo, pageSize)
        // );
        return true;
      },
    },
    {
      field: "finalWeight",
      headerName: "Final Weight (kg)",
      flex: 0.5,
      editable: true,
      valueGetter: (params) => params.row.finalWeight,
      valueSetter: (params) => {
        const newValue = parseFloat(params.newValue);
        // if (isNaN(newValue)) {
        //   return false;
        // }
        // dispatch(
        //   updateMemberFinalWeight(params.id, newValue, membersInfo, pageSize)
        // );
        return true;
      },
    },
    {
      field: "initialBodyType",
      headerName: "Initial Body Type",
      flex: 0.5,
      editable: false,
      valueGetter: (params) => params.row.initialBodyType,
    },
    {
      field: "finalBodyType",
      headerName: "Final Body Type",
      flex: 0.5,
      editable: false,
      valueGetter: (params) => params.row.finalBodyType,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          component={RouterLink}
          to={`/members_progress/${params.row._id}`}
          variant="outlined"
        >
          Go to member
        </Button>
      ),
    },
  ];

  const handleRowClick = (params) => {
    setSelectedMember(params.row);
    setInitialWeight(params.row.initialWeight);
    setFinalWeight(params.row.finalWeight);
    setBodyType(params.row.bodyType);
  };

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Members Progress" subtitle="" />
        {/* {loadingAttendance && <CircularProgress />}
    {errorAttendance && <Alert severity="info">{errorAttendance}</Alert>} */}
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
            // components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  );
}

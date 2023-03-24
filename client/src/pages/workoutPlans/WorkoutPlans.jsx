import React, { useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "state/actions/memberActions";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";

export default function WorkoutPlans() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  const listMembers = useSelector((state) => state.members);
  const { loading, error, membersInfo } = listMembers;

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const filteredMembers = membersInfo?.filter(
    (member) => member.trainer._id === userInfo.trainerId
  );

  if (userInfo.role === "member") {
    const memberId = userInfo.memberId;
    return <Navigate to={`/workout_plans/${memberId}`} />;
  }

  const columns = [
    {
      field: "name",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (membersInfo) => membersInfo.row.user.name,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      valueGetter: (membersInfo) => membersInfo.row.address,
    },
    {
      field: "service",
      headerName: "Service",
      flex: 1,
      valueGetter: (membersInfo) => membersInfo.row.service.name,
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
            navigate(`/workout_plans/${params.row._id}`);
          }}
        >
          See Workout Plan
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Workout Plans" subtitle="" />
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
            rows={
              userInfo.role === "trainer"
                ? filteredMembers || []
                : membersInfo || []
            }
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

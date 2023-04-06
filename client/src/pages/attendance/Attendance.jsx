import React, { useEffect, useContext } from "react";
import { Box, Button, useTheme, CircularProgress, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "state/actions/memberActions";
import { memberAttendanceCheckin } from "state/actions/attendanceActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "components/UserContext";

export default function Attendance() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [clickedMembers, setClickedMembers] = useState({});
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const userRole = useContext(UserContext);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/loginRequired");
    }
    else if (userRole !== "admin") {
      navigate("/unauthorized");
    }
  }, [userRole, userInfo, navigate]);

  const listMembers = useSelector((state) => state.members);
  const { loading, error, membersInfo } = listMembers;

  const checkIn = useSelector((state) => state.memberAttendanceCheckin);
  const {
    loading: loadingAttendance,
    error: errorAttendance,
    success: successAttendance,
  } = checkIn;

  useEffect(() => {
    dispatch(getMembers());
    setIsFirstLoad(false);
  }, [dispatch]);

  // Only dispatch the getMembers action if the page is not loaded for the first time
useEffect(() => {
  if (!isFirstLoad && successAttendance) {
    dispatch(getMembers());
  }
}, [dispatch, isFirstLoad, successAttendance]);

  const columns = [
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
      flex: 0.5,
      valueGetter: (params) => {
        const attendanceDates = params.row.attendance;
        return attendanceDates ? attendanceDates.length : 0;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const memberId = params.row._id;
        const clicked = clickedMembers[memberId];
        const lastClickedDate = new Date(clicked);
        const currentDate = new Date();
        const isButtonDisabled =
          clicked &&
          lastClickedDate.toDateString() === currentDate.toDateString();

        const handleClick = () => {
          setClickedMembers({
            ...clickedMembers,
            [memberId]: new Date(),
          });

          dispatch(memberAttendanceCheckin(memberId));
        };

        return (
          <Button
            variant="contained"
            color="primary"
            disabled={isButtonDisabled}
            onClick={handleClick}
          >
            {isButtonDisabled ? "Checked In" : "Check In"}
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Attendance" subtitle="" />
        {loadingAttendance && <CircularProgress />}
        {errorAttendance && <Alert severity="info">{errorAttendance}</Alert>}
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

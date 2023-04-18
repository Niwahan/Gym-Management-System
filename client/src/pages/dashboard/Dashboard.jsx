import React, { useEffect, useState, useContext } from "react";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import StatBox from "components/StatBox";
import { useDispatch, useSelector } from "react-redux";
import {
  Person,
  Person2,
  FitnessCenter,
  SportsGymnastics,
} from "@mui/icons-material";
import { getMembers } from "state/actions/memberActions";
import { getEquipments } from "state/actions/equipmentActions";
import { getTrainers } from "state/actions/trainerActions";
import { getServices } from "state/actions/serviceActions";
import IEChart from "components/IEChart";
import ServiceOverview from "components/ServiceOverview";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import UserContext from "components/UserContext";

export default function Dashboard() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const userRole = useContext(UserContext);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/loginRequired");
    } else if (userInfo.role === "member" || userInfo.role === "trainer") {
      navigate("/unauthorized");
    }
  }, [userRole, userInfo, navigate]);

  const listMembers = useSelector((state) => state.members);
  const { loading, error, membersInfo } = listMembers;

  const listTrainers = useSelector((state) => state.trainers);
  const { trainersInfo } = listTrainers;

  const listEquipments = useSelector((state) => state.equipments);
  const { equipmentsInfo } = listEquipments;

  const listServices = useSelector((state) => state.services);
  const { servicesInfo } = listServices;

  useEffect(() => {
    dispatch(getMembers());
    dispatch(getTrainers());
    dispatch(getEquipments());
    dispatch(getServices());
  }, [dispatch]);

  const [pageSize, setPageSize] = useState(5);
  const columns = [
    {
      field: "name",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (membersInfo) => membersInfo.row.user.name,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (membersInfo) => membersInfo.row.user.email,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "service",
      headerName: "Service",
      flex: 1,
      valueGetter: (membersInfo) => membersInfo.row.service.name,
    },
    {
      field: "dateOfRegistration",
      headerName: "Date of Registration",
      flex: 1,
      valueGetter: (membersInfo) => {
        const isoDate = membersInfo.row.dateOfRegistration;
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
  ];
  const sortModel = [
    {
      field: "dateOfRegistration",
      sort: "desc",
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total Members"
          value={membersInfo?.length}
          icon={
            <Person
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Trainers"
          value={trainersInfo?.length}
          icon={
            <Person2
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <IEChart />
        </Box>
        <StatBox
          title="Total Equipments"
          value={equipmentsInfo?.length}
          icon={
            <FitnessCenter
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Services"
          value={servicesInfo?.length}
          icon={
            <SportsGymnastics
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 7"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
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
            sortModel={sortModel}
            pageSize={pageSize}
            rowsPerPageOptions={[5]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Services Overview
          </Typography>
          <ServiceOverview />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of total members in each services.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

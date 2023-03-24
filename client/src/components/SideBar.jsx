import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  Person,
  Person2,
  FitnessCenter,
  SportsGymnastics,
  Loop,
  MonitorHeart,
  MonitorWeight,
  Announcement
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";

export default function SideBar({
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
  isNonMobile,
}) {
  const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Members",
      icon: <Person />,
    },
    {
      text: "Trainers",
      icon: <Person2 />,
    },
    {
      text: "Equipments",
      icon: <FitnessCenter />,
    },
    {
      text: "Attendance",
      icon: <TodayOutlined />,
    },
    {
      text: "Announcements",
      icon: <Announcement />,
    },
    {
      text: "Payments",
      icon: <PointOfSaleOutlined />,
    },
    {
      text: "Services",
      icon: <SportsGymnastics />,
    },
    {
      text: "Members Progress",
      icon: <Loop />,
    },
    {
      text: "Workout Plans",
      icon: <MonitorHeart />,
    },
    {
      text: "Diet Plans",
      icon: <MonitorWeight />,
    },
  ];

  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const filteredNavItems = navItems.filter(({ allowedRoles }) => {
    if (!allowedRoles) {
      return true;
    }
    return userInfo && allowedRoles.includes(userInfo.role);
  });

  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    GymBo
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {filteredNavItems.map(({ text, icon }) => {
                const lcText = text.toLowerCase().replace(" ", "_");
                let shouldDisplayNavItem = true;
                if (userInfo.role === "member") {
                  shouldDisplayNavItem = [
                    "dashboard",
                    "workout_plans",
                    "diet_plans",
                    "announcements"
                  ].includes(lcText);
                } else if (userInfo.role === "trainer") {
                  shouldDisplayNavItem = [
                    "dashboard",
                    "members_progress",
                    "workout_plans",
                    "diet_plans",
                    "announcements"
                  ].includes(lcText);
                }
                return shouldDisplayNavItem ? (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                ) : null;
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

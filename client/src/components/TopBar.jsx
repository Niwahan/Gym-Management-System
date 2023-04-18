import React, { useState, useEffect } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  ArrowDropDownOutlined,
  Notifications,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements } from "state/actions/announcementActions";
import {
  AppBar,
  IconButton,
  Toolbar,
  useTheme,
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import { setMode } from "state/modeTogglerSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "state/actions/userActions";

export default function TopBar(props) {
  const navigate = useNavigate();

  const { isSideBarOpen, setIsSideBarOpen } = props;

  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const [open, setOpen] = useState(false);
  const handleNotificationClick = (event) => {
    setAnchorEl2(event.currentTarget);
    setOpen(true);
  };
  const handleNotificationClose = () => {
    setAnchorEl2(null);
    setOpen(false);
  };

  const listAnnouncements = useSelector((state) => state.announcements);
  const { announcementsInfo } = listAnnouncements;

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <FlexBetween>
          <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* Right Side */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={handleNotificationClick}>
            <Badge badgeContent={announcementsInfo?.length} color="secondary">
              <Notifications sx={{ fontSize: "25px" }} />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl2}
            open={open}
            onClose={handleNotificationClose}
            onClick={handleNotificationClose}
          >
            {announcementsInfo?.map((notification, index) => (
              <MenuItem key={index}>{notification.title}</MenuItem>
            ))}
            <MenuItem
              style={{
                background: "#f5f5f5",
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/announcements")}
            >
              See all announcements
            </MenuItem>
          </Menu>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={userInfo?.pic}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {userInfo?.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {userInfo?.role.charAt(0).toUpperCase() +
                    userInfo?.role.slice(1).toLowerCase()}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/edit-profile");
                }}
              >
                Edit Profile
              </MenuItem>
              <MenuItem
                onClick={logoutHandler}
                style={{
                  background: "#f5f5f5",
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

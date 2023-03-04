import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import TopBar from "components/TopBar";
import SideBar from "components/SideBar";
// import { useGetUserQuery } from "state/api";

export default function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <SideBar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Box flexGrow={1}>
        <TopBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}

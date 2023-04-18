import React, { useEffect } from "react";
import { useTheme, Box } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { useDispatch, useSelector } from "react-redux";
import { getServiceOverview } from "state/actions/serviceActions";

export default function ServiceOverview() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const listServiceOverview = useSelector((state) => state.serviceOverview);
  const { serviceOverviewInfo } = listServiceOverview;

  useEffect(() => {
    dispatch(getServiceOverview());
  }, [dispatch]);
  const colors = [
    "#F47A1F",
    "#FDBB2F",
    "#377B2B",
    "#7AC142",
    "#007CC3",
    "#00529B",
  ];

  const formattedData = serviceOverviewInfo
    ? Object.entries(serviceOverviewInfo).map(([id, data], i) => ({
        id: data.name,
        label: data.name,
        value: data.memberCount,
        color: colors[i],
      }))
    : [];

  return (
    <Box
      height={"400px"}
      width={undefined}
      minHeight={"325px"}
      minWidth={"325px"}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={{ top: 40, right: 80, bottom: 100, left: 50 }}
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: "translate(-75%, -170%)",
        }}
      ></Box>
    </Box>
  );
}

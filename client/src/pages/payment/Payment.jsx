import React, { useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "state/actions/memberActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { makePayment } from "state/actions/paymentActions";

export default function Payment() {
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
      field: "service",
      headerName: "Service Taken",
      flex: 0.5,
      valueGetter: (membersInfo) => membersInfo.row.service.name,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
      valueGetter: (membersInfo) =>
        membersInfo.row.service.price + " per month",
    },
    {
      field: "plan",
      headerName: "Plan",
      flex: 0.5,
      valueGetter: (membersInfo) => membersInfo.row.plan + " month/s",
    },
    {
      field: "paidDate",
      headerName: "Last Paid Date",
      flex: 0.5,
      valueGetter: (params) => {
        const payments = params.row.payment || [];
        const latestPayment = payments.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )[0];
        return latestPayment
          ? new Date(latestPayment.date).toLocaleDateString()
          : "Not Paid";
      },
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
            dispatch(makePayment(params.row._id));
            navigate(`/payments/${params.row._id}`);
          }}
        >
          Make Payment
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Payments" subtitle=" " />
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

import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { Box, Button, Typography, Divider, Grid, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function PaymentInvoice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [plan, setPlan] = useState(0);
  const [price, setPrice] = useState(0);
  const paidDate = new Date().toLocaleDateString();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/loginRequired");
    }
    else if (userInfo.role === "member" || userInfo.role === "trainer") {
      navigate("/unauthorized");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await axios.get(`/api/members/${id}`);

        setName(data.user.name);
        setPlan(data.plan);
        setServiceName(data.service.name);
        setPrice(data.service.price);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [id]);

  const amountPayable = price * plan;
  const handlePrintInvoice = () => {
    const invoiceContent = document.getElementById("invoice-content");
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = invoiceContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Payment Invoice"
          subtitle=" "
          button={
            <Button variant="contained" onClick={() => handlePrintInvoice()}>
              Print
            </Button>
          }
        />
        <Box mt="20px">
          <Box
            display="flex"
            flexDirection="row"
            mb="10px"
            justifyContent="center"
            alignItems="center"
            sx={{
              "& > *": {
                margin: "50px",
                padding: "50px",
              },
            }}
          >
            <Paper
              sx={{
                padding: "50px",
                margin: "50px",
                width: "800px",
                height: "400px",
              }}
              id="invoice-content"
            >
              <Grid>
                <Typography variant="h3">Payment Receipt</Typography>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {" "}
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography variant="subtitle1">
                    Invoice No. {Math.floor(Math.random() * 9000000 + 100000)}
                  </Typography>
                  <Typography variant="subtitle2">GymBo</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Box mt={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Member: {name}
                    </Typography>
                    <Typography variant="subtitle2">
                      Paid On: {paidDate.toString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Active
                    </Typography>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Service Taken</th>
                        <th>Price Per Month</th>
                        <th>Valid Upto</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ textAlign: "center" }}>
                        <td>{serviceName}</td>
                        <td>{price}</td>
                        <td>{plan} Month/s</td>
                      </tr>
                    </tbody>
                  </table>
                  <Box mt={2}>
                    <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
                      Total Amount Payable: ${amountPayable}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import {
  Box,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEquipments } from "state/actions/equipmentActions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AddEquipments() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [purchasedDate, setPurchasedDate] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/loginRequired");
    } else if (userInfo.role === "member" || userInfo.role === "trainer") {
      navigate("/unauthorized");
    }
  }, [userInfo, navigate]);

  const equipmentCreate = useSelector((state) => state.equipmentCreate);
  const { loading, error, success } = equipmentCreate;

  const resetHandler = () => {
    setName("");
    setQuantity("");
    setPrice("");
    setPurchasedDate(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(createEquipments(name, quantity, price, purchasedDate));
    if (!name || !quantity || !price || !purchasedDate) return;
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: "EQUIPMENT_CREATE_RESET" });
      resetHandler();
      navigate("/equipments");
    }
  }, [success, dispatch, navigate]);

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Add Equipment" subtitle="Create a New Equipment" />
      </Box>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 6, ml: 5, mr: 5 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="Name"
              required
              fullWidth
              value={name}
              id="Name"
              label="Name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="quantity"
              label="Quantity"
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="price"
              label="Price"
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Purchased Date"
                value={purchasedDate}
                onChange={(date) => {
                  setPurchasedDate(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>
      </Box>
    </>
  );
}

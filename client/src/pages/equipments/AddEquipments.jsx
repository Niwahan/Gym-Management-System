import {
  Box,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEquipments } from "state/actions/equipmentActions";

export default function AddEquipments() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [purchasedDate, setPurchasedDate] = useState("");
  //   const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();

  const equipmentCreate = useSelector((state) => state.equipmentCreate);
  const { loading, error, success } = equipmentCreate;

  const resetHandler = () => {
    setName("");
    setDescription("");
    setQuantity("");
    setPrice("");
    setPurchasedDate("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      createEquipments(name, description, quantity, price, purchasedDate)
    );
    if (!name || !description || !quantity || !price || !purchasedDate) return;

    resetHandler();
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: "EQUIPMENT_CREATE_RESET" });
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
              name="description"
              label="Description"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="quantity"
              label="Quantity"
              id="quantity"
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="purchasedDate"
              label="Purchased Date"
              id="purchasedDate"
              value={purchasedDate}
              onChange={(e) => setPurchasedDate(e.target.value)}
            />
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

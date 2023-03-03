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
import { createServices } from "state/actions/serviceActions";

export default function AddServices() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  //   const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();

  const serviceCreate = useSelector((state) => state.serviceCreate);
  const { loading, error, success } = serviceCreate;

  const resetHandler = () => {
    setName("");
    setDescription("");
    setPrice("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(createServices(name, description, price));
    if (!name || !description || !price) return;
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: "SERVICE_CREATE_RESET" });
      resetHandler();
      navigate("/services");
    }
  }, [success, dispatch, navigate]);

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Add Service" subtitle="Create a New Service" />
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
              label="description"
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
              name="price"
              label="Price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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

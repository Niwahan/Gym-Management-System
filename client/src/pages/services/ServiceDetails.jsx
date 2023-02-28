import React, { useState, useEffect } from "react";
import Header from "components/Header";
import {
  Box,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { deleteServices, updateServices } from "state/actions/serviceActions";

export default function ServiceDetails() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const serviceUpdate = useSelector((state) => state.serviceUpdate);
  const { loading, error, success } = serviceUpdate;

  useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await axios.get(`/api/services/${id}`);

        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [id]);

  const serviceDelete = useSelector((state) => state.serviceDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    // success: successDelete,
  } = serviceDelete;

  const deleteHandler = (id) => {
    dispatch(deleteServices(id));
    navigate("/services");
  };

  const editModeHandler = () => {
    setEditMode(true);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateServices(id, name, description, price, () => {
        setName(name);
        setDescription(description);
        setPrice(price);
      })
    );
    if (!name || !description || !price) return;
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: "SERVICE_UPDATE_RESET" });
      setEditMode(false);
    }
  }, [success, dispatch]);

  useEffect(() => {});

  return (
    <div>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Service Details"
          subtitle=""
          button={
            <Button variant="contained" onClick={() => deleteHandler(id)}>
              Delete Service
            </Button>
          }
        />
        {loadingDelete && <CircularProgress />}
        {errorDelete && <Alert severity="error">{errorDelete}</Alert>}
        {!editMode && (
          <Box mt="40px">
            <Button
              onClick={editModeHandler}
              variant="contained"
              sx={{ height: "50px" }}
              color="primary"
            >
              Edit Service
            </Button>
            <h3>Name: {name}</h3>
            <h3>Description: {description}</h3>
            <h3>Price: {price}</h3>
          </Box>
        )}
        {editMode && (
          <Box
            component="form"
            onSubmit={updateHandler}
            sx={{ mt: 6, ml: 5, mr: 5 }}
          >
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
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
              Update
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
}

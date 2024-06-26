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
import {
  deleteEquipments,
  updateEquipments,
} from "state/actions/equipmentActions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function EquipmentDetails() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [purchasedDate, setPurchasedDate] = useState(new Date());
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
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

  const equipmentUpdate = useSelector((state) => state.equipmentUpdate);
  const { loading, error, success } = equipmentUpdate;

  useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await axios.get(process.env.REACT_APP_BASE_URL + `/api/equipments/${id}`);

        setName(data.name);
        setQuantity(data.quantity);
        setPrice(data.price);
        setPurchasedDate(data.purchasedDate);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [id]);

  const formattedDate = new Date(purchasedDate)?.toLocaleDateString();

  const equipmentDelete = useSelector((state) => state.equipmentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
  } = equipmentDelete;

  const deleteHandler = (id) => {
    dispatch(deleteEquipments(id));
    navigate("/equipments");
  };

  const editModeHandler = () => {
    setEditMode(true);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const selectedDate = new Date(purchasedDate);
    const currentDate = new Date();
    if (selectedDate.getTime() > currentDate.getTime()) {
      return;
    }
    if (!name || !quantity || !price || !purchasedDate) return;
    dispatch(
      updateEquipments(id, name, quantity, price, purchasedDate, () => {
        setName(name);
        setQuantity(quantity);
        setPrice(price);
        setPurchasedDate(purchasedDate);
      })
    );
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: "EQUIPMENT_UPDATE_RESET" });
      setEditMode(false);
    }
  }, [success, dispatch]);

  return (
    <div>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Equipment Details"
          subtitle=""
          button={
            <Button variant="contained" onClick={() => deleteHandler(id)}>
              Delete Equipment
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
              Edit Equipment
            </Button>
            <h3>Name: {name}</h3>
            <h3>Quantity: {quantity}</h3>
            <h3>Price: {price}</h3>
            <h3>Purchased Date: {formattedDate}</h3>
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
                    value={dayjs(purchasedDate)}
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
              Update
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
}

import React, { useState, useEffect, useContext } from "react";
import Header from "components/Header";
import {
  Box,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { deleteTrainers, updateTrainers } from "state/actions/trainerActions";
import UserContext from "components/UserContext";

export default function TrainerDetails() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const experienceOptions = [
    "Less than 1 year",
    "1-2 years",
    "3-4 years",
    "More than 5 years",
  ];
  const [experience, setExperience] = useState("");
  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRole = useContext(UserContext);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/loginRequired");
    }
    else if (userRole !== "admin") {
      navigate("/unauthorized");
    }
  }, [userRole, userInfo, navigate]);

  const trainerUpdate = useSelector((state) => state.trainerUpdate);
  const { loading, error, success } = trainerUpdate;

  useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await axios.get(`/api/trainers/${id}`);

        setName(data.user.name);
        setEmail(data.user.email);
        setAddress(data.address);
        setPhoneNumber(data.phoneNumber);
        setExperience(data.experience);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [id]);

  const trainerDelete = useSelector((state) => state.trainerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    // success: successDelete,
  } = trainerDelete;

  const deleteHandler = (id) => {
    dispatch(deleteTrainers(id));
    navigate("/trainers");
  };

  const editModeHandler = () => {
    setEditMode(true);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTrainers(id, name, email, address, phoneNumber, experience, () => {
        setName(name);
        setEmail(email);
        setAddress(address);
        setPhoneNumber(phoneNumber);
        setExperience(experience);
      })
    );
    if (!name || !email || !address || !phoneNumber || !experience) return;
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: "TRAINER_UPDATE_RESET" });
      setEditMode(false);
    }
  }, [success, dispatch]);

  useEffect(() => {});

  return (
    <div>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Trainer Details"
          subtitle=""
          button={
            <Button variant="contained" onClick={() => deleteHandler(id)}>
              Delete Trainer
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
              Edit Trainer
            </Button>
            <h3>Name: {name}</h3>
            <h3>Email: {email}</h3>
            <h3>Address: {address}</h3>
            <h3>Phone Number: {phoneNumber}</h3>
            <h3>Experience: {experience}</h3>
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
                  name="fullName"
                  required
                  fullWidth
                  value={name}
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  id="experience"
                  value={experience}
                  onChange={handleExperienceChange}
                  placeholder="Experience"
                  displayEmpty
                  style={{ width: "100%" }}
                >
                  <MenuItem value="" disabled>
                    Select years of experience
                  </MenuItem>
                  {experienceOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
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

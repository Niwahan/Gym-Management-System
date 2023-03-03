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
// import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTrainers } from "state/actions/trainerActions";
import { useNavigate } from "react-router-dom";

export default function AddTrainers() {
  const experienceOptions = [
    "Less than 1 year",
    "1-2 years",
    "3-4 years",
    "More than 5 years",
  ];
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState("");
  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };
  //   const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();

  const trainerCreate = useSelector((state) => state.trainerCreate);
  const { loading, error, success } = trainerCreate;

  const resetHandler = () => {
    setEmail("");
    setName("");
    setPassword("");
    setAddress("");
    setPhoneNumber("");
    setExperience("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      createTrainers(name, email, password, address, phoneNumber, experience)
    );
    if (!name || !email || !password || !address || !phoneNumber || !experience)
      return;
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: "TRAINER_CREATE_RESET" });
      resetHandler();
      navigate("/trainers");
    }
  }, [success, dispatch, navigate]);

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Add Trainer" subtitle="Create a New Trainer Profile" />
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          Create
        </Button>
      </Box>
    </>
  );
}

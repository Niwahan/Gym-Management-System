import {
  Box,
  Button,
  TextField,
  Grid,
  Select,
  CircularProgress,
  MenuItem,
  Alert,
  InputLabel,
} from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMembers } from "state/actions/memberActions";
import { getTrainers } from "state/actions/trainerActions";
import { getServices } from "state/actions/serviceActions";
import { useNavigate } from "react-router-dom";

export default function AddMembers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [trainerId, setTrainer] = useState("");
  const [serviceId, setService] = useState("");
  const [dateOfRegistration, setDateOfRegistration] = useState("");
  const [plan, setPlan] = useState("");
  // const isNonMobile = useMediaQuery("(min-width:600px)");

  const planOptions = {
    1: "One Month",
    3: "Three Months",
    6: "Six Months",
    12: "One Year",
  };

  const memberCreate = useSelector((state) => state.memberCreate);
  const { loading, error, success } = memberCreate;

  const listTrainers = useSelector((state) => state.trainers);
  const { trainersInfo } = listTrainers;

  const listServices = useSelector((state) => state.services);
  const { servicesInfo } = listServices;

  const resetHandler = () => {
    setEmail("");
    setName("");
    setPassword("");
    setAddress("");
    setPhoneNumber("");
    setGender("");
    setTrainer("");
    setService("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      createMembers(
        name,
        email,
        password,
        gender,
        address,
        phoneNumber,
        dateOfRegistration,
        trainerId,
        serviceId,
        plan
      )
    );
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !phoneNumber ||
      !gender ||
      !trainerId ||
      !serviceId ||
      !plan
    )
      return;
  };

  useEffect(() => {
    dispatch(getTrainers());
    dispatch(getServices());
    const currentDate = new Date().toISOString().substr(0, 10);
    setDateOfRegistration(currentDate);
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch({ type: "MEMBER_CREATE_RESET" });
      resetHandler();
      navigate("/members");
    }
  }, [success, dispatch, navigate]);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleTrainerChange = (event) => {
    setTrainer(event.target.value);
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
  };
  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Add Member" subtitle="Create a New Member Profile" />
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
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              id="gender"
              value={gender}
              onChange={handleGenderChange}
              fullWidth
              label="Gender"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Gender
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
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
            <InputLabel id="trainer-label">Trainer</InputLabel>
            <Select
              id="trainer"
              value={trainerId}
              onChange={handleTrainerChange}
              displayEmpty
              fullWidth
              label="Trainer"
            >
              <MenuItem value="" disabled>
                Select trainer
              </MenuItem>
              {trainersInfo.map((trainer) => (
                <MenuItem key={trainer._id} value={trainer._id}>
                  {trainer.user.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="service-label">Service</InputLabel>
            <Select
              id="service"
              value={serviceId}
              onChange={handleServiceChange}
              fullWidth
              displayEmpty
              label="Service"
            >
              <MenuItem value="" disabled>
                Select service
              </MenuItem>
              {servicesInfo.map((service) => (
                <MenuItem key={service._id} value={service._id}>
                  {service.name} - ${service.price} per month
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="plan-label">Plan</InputLabel>
            <Select
              id="plan"
              value={plan}
              onChange={handlePlanChange}
              fullWidth
              displayEmpty
              label="Plan"
            >
              <MenuItem value="" disabled>
                Select plan
              </MenuItem>
              {Object.keys(planOptions).map((option) => (
                <MenuItem key={option} value={option}>
                  {planOptions[option]}
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

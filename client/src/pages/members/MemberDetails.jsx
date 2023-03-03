import React, { useState, useEffect } from "react";
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
import { deleteMembers, updateMembers } from "state/actions/memberActions";
import { getTrainers } from "state/actions/trainerActions";
import { getServices } from "state/actions/serviceActions";

export default function MemberDetails() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [trainer, setTrainer] = useState("");
  const [service, setService] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [serviceName, setServiceName] = useState("");

  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberUpdate = useSelector((state) => state.memberUpdate);
  const { loading, error, success } = memberUpdate;

  const listTrainers = useSelector((state) => state.trainers);
  const { trainersInfo } = listTrainers;

  const listServices = useSelector((state) => state.services);
  const { servicesInfo } = listServices;

  useEffect(() => {
    dispatch(getTrainers());
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await axios.get(`/api/members/${id}`);

        setName(data.user.name);
        setEmail(data.user.email);
        setGender(data.gender);
        setAddress(data.address);
        setPhoneNumber(data.phoneNumber);
        setTrainer(data.trainer._id);
        setService(data.service._id);
        setServiceName(data.service.name);
        setTrainerName(data.trainer.user.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [id]);

  const memberDelete = useSelector((state) => state.memberDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    // success: successDelete,
  } = memberDelete;

  const deleteHandler = (id) => {
    dispatch(deleteMembers(id));
    navigate("/members");
  };

  const editModeHandler = () => {
    setEditMode(true);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateMembers(
        id,
        name,
        email,
        gender,
        address,
        phoneNumber,
        trainer,
        service,
        () => {
          setName(name);
          setEmail(email);
          setGender(gender);
          setAddress(address);
          setPhoneNumber(phoneNumber);
          setTrainer(trainer);
          setService(service);
        }
      )
    );
    if (
      !name ||
      !email ||
      !address ||
      !phoneNumber ||
      !gender ||
      !trainer ||
      !service
    )
      return;
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: "MEMBER_UPDATE_RESET" });
      setEditMode(false);
    }
  }, [success, dispatch]);

  useEffect(() => {});

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleTrainerChange = (event) => {
    setTrainer(event.target.value);
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  return (
    <div>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Member Details"
          subtitle=""
          button={
            <Button variant="contained" onClick={() => deleteHandler(id)}>
              Delete Member
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
              Edit Member
            </Button>
            <h3>Name: {name}</h3>
            <h3>Email: {email}</h3>
            <h3>Gender: {gender}</h3>
            <h3>Address: {address}</h3>
            <h3>Phone Number: {phoneNumber}</h3>
            <h3>Service: {serviceName}</h3>
            <h3>Trainer: {trainerName}</h3>
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
                <Select
                  id="trainer"
                  value={trainer}
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
                <Select
                  id="service"
                  value={service}
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
                      {service.name}
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

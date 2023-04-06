import {
  Box,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "state/actions/userActions";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [picMessage, setPicMessage] = useState();
  const [successUpdate, setSuccessUpdate] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    if (!userInfo) {
      navigate("/loginRequired");
    }
  }, [userInfo, navigate]);

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error } = userUpdate;

  useEffect(() => {
    const fetching = async () => {
      try {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPic(userInfo.pic);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [userInfo]);

  const postDetails = (pics) => {
    if (pics === userInfo.pic) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "gymbo_");
      data.append("cloud_name", "niwahang");
      fetch("https://api.cloudinary.com/v1_1/niwahang/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to upload image");
          }
          return res.json();
        })
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
          setPicMessage("Failed to upload image");
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword)
      dispatch(updateProfile({ name, email, password, pic }));
    setSuccessUpdate(true);
    setTimeout(() => {
      setSuccessUpdate(false);
    }, 3000);
  };

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Edit Profile" subtitle="Make change to your profile" />
      </Box>
      {loading && <CircularProgress />}
      {successUpdate && (
        <Alert severity="success">Profile Successfully Updated</Alert>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 6, ml: 5, mr: 5 }}
      >
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <Box gridColumn="span 7" gridRow="span 3">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="fullName"
                  required
                  value={name}
                  fullWidth
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
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="******"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  placeholder="******"
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="file"
                  name="pic"
                  label="Profile Picture"
                  id="pic"
                  accept=".jpg,.png,.jpeg"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
                {picMessage && <Alert severity="error">{picMessage}</Alert>}
              </Grid>
            </Grid>
          </Box>
          <Box gridColumn="span 4" gridRow="span 2">
            <img
              src={pic}
              alt={name}
              style={{ marginLeft: "70px", height: "350px", width: "350px" }}
            />
          </Box>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </>
  );
}

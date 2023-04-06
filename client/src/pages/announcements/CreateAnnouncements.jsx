import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAnnouncements } from "state/actions/announcementActions";
import UserContext from "components/UserContext";

export default function CreateAnnouncements() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

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

  const announcementCreate = useSelector((state) => state.announcementCreate);
  const { loading, error, success } = announcementCreate;

  const resetHandler = () => {
    setTitle("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(createAnnouncements(title, message));
    if (!title || !message) return;
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: "ANNOUNCEMENT_CREATE_RESET" });
      resetHandler();
      navigate("/announcements");
    }
  }, [success, dispatch, navigate]);

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Add Announcements"
          subtitle="Create a New Announcement"
        />
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
              name="Title"
              required
              fullWidth
              value={title}
              id="Title"
              label="Title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={5}
              name="Message"
              label="Message"
              type="text"
              id="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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

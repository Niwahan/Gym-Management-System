import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { createWorkoutPlans, getWorkoutPlans } from "state/actions/workoutPlanActions";
import { useParams } from "react-router-dom";

export default function WorkoutModalDialog({ isOpen, onClose }) {
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [exercises, setExercises] = useState([
    {
      name: "",
      sets: 0,
      reps: 0,
    },
  ]);

  const workoutPlanCreate = useSelector((state) => state.workoutPlanCreate);
  const { success } = workoutPlanCreate;

  const resetHandler = () => {
    setTitle("");
    setDate(null);
    setExercises([
      {
        name: "",
        sets: 0,
        reps: 0,
      },
    ]);
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: "WORKOUTPLAN_CREATE_RESET" });
      dispatch(getWorkoutPlans(id));
      resetHandler();
      
      onClose();
    }
  }, [success, dispatch, id, onClose]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(createWorkoutPlans(id, title, date, exercises));
  };

  const handleRemoveExercise = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const customModalStyle = {
    content: {
      width: "40%",
      height: "61%",
      margin: "auto",
      backgroundColor: "grey",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customModalStyle}>
      <Typography
        variant="h4"
        color={theme.palette.secondary[400]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        Add Workout
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2, ml: 4, mr: 4 }}
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(date) => {
                  setDate(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          {exercises.map((exercise, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <TextField
                  name={`Exercise ${index + 1} Name`}
                  required
                  fullWidth
                  value={exercise.name}
                  label={`Exercise ${index + 1} Name`}
                  onChange={(e) => {
                    const newExercises = [...exercises];
                    newExercises[index].name = e.target.value;
                    setExercises(newExercises);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={`Exercise ${index + 1} Sets`}
                  label={`Exercise ${index + 1} Sets`}
                  type="number"
                  value={exercise.sets}
                  onChange={(e) => {
                    const newExercises = [...exercises];
                    newExercises[index].sets = e.target.value;
                    setExercises(newExercises);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={`Exercise ${index + 1} Reps`}
                  label={`Exercise ${index + 1} Reps`}
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => {
                    const newExercises = [...exercises];
                    newExercises[index].reps = e.target.value;
                    setExercises(newExercises);
                  }}
                />
              </Grid>
              {exercises.length > 1 &&
                (exercise.sets !== 1 || exercise.reps !== 1) && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveExercise(index)}
                    >
                      Remove Exercise
                    </Button>
                  </Grid>
                )}
            </React.Fragment>
          ))}
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            fullWidth
            onClick={() =>
              setExercises([...exercises, { name: "", sets: 0, reps: 0 }])
            }
          >
            Add Exercise
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Workout
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}

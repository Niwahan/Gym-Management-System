import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import Header from "components/Header";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import WorkoutModalDialog from "components/WorkoutModalDialog";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteWorkoutPlans,
  getWorkoutPlans,
} from "state/actions/workoutPlanActions";

export default function SingleWorkoutPlan() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/loginRequired");
    }
  }, [ userInfo, navigate]);

  const listWorkoutPlans = useSelector((state) => state.workoutPlan);
  const { workoutplansInfo } = listWorkoutPlans;

  const workoutPlanDelete = useSelector((state) => state.workoutPlanDelete);
  const { success: successDelete } = workoutPlanDelete;

  useEffect(() => {
    dispatch(getWorkoutPlans(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (successDelete) {
      window.location.reload();
    }
  }, [successDelete, dispatch]);

  const [calendarPlugins, setCalendarPlugins] = useState([
    dayGridPlugin,
    listPlugin,
  ]);

  useEffect(() => {
    if (userInfo.role === "member") {
      setCalendarPlugins([dayGridPlugin, listPlugin]);
    } else {
      setCalendarPlugins([dayGridPlugin, interactionPlugin, listPlugin]);
    }
  }, [userInfo.role]);

  const events =
    workoutplansInfo.length > 0
      ? workoutplansInfo.map((workoutplans) => ({
          id: workoutplans._id,
          title: workoutplans.title,
          start: workoutplans.date,
          end: workoutplans.date,
          allDay: true,
          extendedProps: {
            exercises: workoutplans.exercises,
          },
        }))
      : [];

  const handleEventClick = (selected) => {
    const workoutPlanId = selected.event.id;
    if (
      window.confirm(
        `Are you sure you want to delete the workout '${selected.event.title}'`
      )
    ) {
      dispatch(deleteWorkoutPlans(id, workoutPlanId));
      selected.event.remove();
    }
  };

  const eventRender = ({ event }) => {
    return (
      <div>
        <div>Title: {event.title}</div>
        <div>
          Exercises:
          <ul>
            {event.extendedProps.exercises.map((exercise, index) => (
              <li key={index}>
                {exercise.name} <br /> Sets: {exercise.sets} <br /> Reps:{" "}
                {exercise.reps}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const today = new Date();
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getFullYear() === today.getFullYear() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getDate() === today.getDate()
    );
  });

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Workout Plans"
          subtitle=" "
          button={
            userInfo.role === "member" ? null : (
              <Button variant="contained" onClick={() => setModalOpen(true)}>
                Add Workout
              </Button>
            )
          }
        />

        <Box display="flex" justifyContent="space-between">
          <Box
            flex="1 1 20%"
            backgroundColor={theme.palette.background}
            p="15px"
            borderRadius="4px"
            ml="25px"
            mr="25px"
          >
            <Typography variant="h5">Workouts for Today</Typography>
            <List>
              {filteredEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: theme.palette.secondary[600],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    primaryTypographyProps={{ component: "div" }}
                    secondary={
                      <>
                        <Typography>
                          {formatDate(event.start, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                        Exercises:
                        <ul>
                          {event.extendedProps.exercises.map(
                            (exercise, index) => (
                              <li key={index}>
                                {exercise.name}
                                <br />
                                Sets: {exercise.sets}
                                <br />
                                Reps: {exercise.reps}
                              </li>
                            )
                          )}
                        </ul>
                      </>
                    }
                    secondaryTypographyProps={{ component: "div" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box
            flex="1 1 100%"
            ml="15px"
            sx={{ position: "relative", zIndex: 0 }}
          >
            <FullCalendar
              height="75vh"
              plugins={calendarPlugins}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridWeek dayGridDay listWeek",
              }}
              initialView="dayGridWeek"
              events={events}
              eventContent={eventRender}
              eventClick={handleEventClick}
            />
            <WorkoutModalDialog
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

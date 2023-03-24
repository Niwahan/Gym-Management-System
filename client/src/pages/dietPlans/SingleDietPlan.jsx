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
import DietModalDialog from "components/DietModalDialog";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDietPlans, deleteDietPlans } from "state/actions/dietPlanActions";

export default function SingleDietPlan() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const listDietPlans = useSelector((state) => state.dietPlan);
  const { dietplansInfo } = listDietPlans;

  const dietPlanDelete = useSelector((state) => state.dietPlanDelete);
  const { success: successDelete } = dietPlanDelete;

  const ulStyle = { margin: 0, padding: 0, listStyle: "none" };

  useEffect(() => {
    dispatch(getDietPlans(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (successDelete) {
      window.location.reload();
    }
  }, [successDelete, dispatch]);

  const events =
    dietplansInfo.length > 0
      ? dietplansInfo.map((dietplans) => ({
          id: dietplans._id,
          title: dietplans.title,
          start: dietplans.date,
          end: dietplans.date,
          allDay: true,
          extendedProps: {
            meals: dietplans.meals,
          },
        }))
      : [];

  const handleEventClick = (selected) => {
    const dietPlanId = selected.event.id;
    if (
      window.confirm(
        `Are you sure you want to delete the diet '${selected.event.title}'`
      )
    ) {
      dispatch(deleteDietPlans(id, dietPlanId));
      selected.event.remove();
    }
  };

  const eventRender = ({ event }) => {
    return (
      <div>
        <div>Title: {event.title}</div>
        <div>
          Diets:
          <ul style={ulStyle}>
            {event.extendedProps.meals.map((meal, index) => (
              <li key={index}>
                {meal.name} <br />
                <ul>
                  {meal.mealItems.map((mealItem, index) => (
                    <li key={index}>
                      Name: {mealItem.name} <br />
                      Calories: {mealItem.calories}
                    </li>
                  ))}
                </ul>
                Total Calories: {meal.totalCalories}
                <br />
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
          title="Diet Plans"
          subtitle=" "
          button={
            <Button variant="contained" onClick={() => setModalOpen(true)}>
              Add Diet
            </Button>
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
            <Typography variant="h5">Diets for Today</Typography>
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
                        Diets:
                        <ul style={ulStyle}>
                          {event.extendedProps.meals.map((meal, index) => (
                            <li key={index}>
                              {meal.name} <br />
                              <ul>
                                {meal.mealItems.map((mealItem, index) => (
                                  <li key={index}>
                                    Name: {mealItem.name} <br />
                                    Calories: {mealItem.calories}
                                  </li>
                                ))}
                              </ul>
                              Total Calories: {meal.totalCalories}
                            </li>
                          ))}
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
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridWeek dayGridDay listWeek",
              }}
              initialView="dayGridWeek"
              eventClick={handleEventClick}
              events={events}
              eventContent={eventRender}
              initialEvents={[
                {
                  id: "12315",
                  title: "Scrambled Eggs",
                  date: "2023-03-05",
                },
                {
                  id: "5123",
                  title: "Toast",
                  date: "2023-03-06",
                },
              ]}
            />
            <DietModalDialog
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDietPlans, getDietPlans } from "state/actions/dietPlanActions";

export default function DietModalDialog({ isOpen, onClose }) {
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [meals, setMeals] = useState([
    {
      name: "",
      mealItems: [],
      totalCalories: 0,
    },
  ]);

  const dietPlanCreate = useSelector((state) => state.dietPlanCreate);
  const { success } = dietPlanCreate;

  const resetHandler = () => {
    setTitle("");
    setDate(null);
    setMeals([]);
  }

  useEffect(()=> {
    if (success) {
      dispatch({type: "DIETPLAN_CREATE_RESET"});
      dispatch(getDietPlans(id));
      resetHandler();
      onClose();
    }
  }, [success, dispatch, id, onClose])

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(createDietPlans(id, title, date, meals));
  };

  const addMeal = () => {
    setMeals([...meals, { name: "", mealItems: [], totalCalories: 0 }]);
  };

  const addMealItem = (mealIndex) => {
    setMeals((meals) => {
      const updatedMeals = [...meals];
      updatedMeals[mealIndex].mealItems.push({ name: "", calories: 0 });
      return updatedMeals;
    });
  };

  const handleRemoveMeal = (mealIndex) => {
    const newMeals = [...meals];
    newMeals.splice(mealIndex, 1);
    setMeals(newMeals);
  };

  const handleRemoveMealItem = (mealIndex, mealItemIndex) => {
    setMeals((prevMeals) => {
      const updatedMeals = [...prevMeals];
      updatedMeals[mealIndex].mealItems.splice(mealItemIndex, 1);
      return updatedMeals;
    });
  };

  const calculateTotalCalories = (mealItems) => {
    return mealItems.reduce((totalCalories, mealItem) => {
      return totalCalories + parseInt(mealItem.calories);
    }, 0);
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
        Add Diet
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
          {meals.map((meal, mealIndex) => (
            <React.Fragment key={mealIndex}>
              <Grid item xs={12}>
                <TextField
                  name={`Meal ${mealIndex + 1} Name`}
                  required
                  fullWidth
                  value={meal.name}
                  label={`Meal ${mealIndex + 1} Name`}
                  onChange={(e) => {
                    const newMeals = [...meals];
                    newMeals[mealIndex].name = e.target.value;
                    setMeals(newMeals);
                  }}
                />
              </Grid>
              {meal.mealItems.map((mealItem, mealItemIndex) => (
                <React.Fragment key={mealItemIndex}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name={`MealItem ${mealItemIndex + 1} Name`}
                      label={`MealItem ${mealItemIndex + 1} Name`}
                      type="text"
                      value={mealItem.name}
                      onChange={(e) => {
                        const newMealItems = [...meal.mealItems];
                        newMealItems[mealItemIndex].name = e.target.value;
                        setMeals((meals) => [
                          ...meals.slice(0, mealIndex),
                          {
                            ...meal,
                            mealItems: newMealItems,
                          },
                          ...meals.slice(mealIndex + 1),
                        ]);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name={`MealItem ${mealItemIndex + 1} Calories`}
                      label={`MealItem ${mealItemIndex + 1} Calories`}
                      type="number"
                      value={mealItem.calories}
                      onChange={(e) => {
                        const newMealItems = [...meal.mealItems];
                        newMealItems[mealItemIndex].calories = e.target.value;
                        const updatedMeal = {
                          ...meal,
                          mealItems: newMealItems,
                          totalCalories: calculateTotalCalories(newMealItems),
                        };
                        setMeals((meals) => [    ...meals.slice(0, mealIndex),    updatedMeal,    ...meals.slice(mealIndex + 1),  ]);
                      }}
                    />
                  </Grid>
                  {meal.mealItems.length > 1 && (
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          handleRemoveMealItem(mealIndex, mealItemIndex)
                        }
                      >
                        Remove Meal Item
                      </Button>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                fullWidth
                onClick={() => addMealItem(mealIndex)}
              >
                Add Meal Item
              </Button>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={`Meal ${mealIndex + 1} Total Calories`}
                  label={`Meal ${mealIndex + 1} Total Calories`}
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={meals.totalCalories}
                  onChange={(e) => {
                    const newMeals = [...meals];
                    newMeals[mealIndex].totalCalories = e.target.value;
                    setMeals(newMeals);
                  }}
                />
              </Grid> */}
              {meals.length > 1 && (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveMeal(mealIndex)}
                  >
                    Remove Meal
                  </Button>
                </Grid>
              )}
            </React.Fragment>
          ))}
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            fullWidth
            onClick={() => addMeal()}
          >
            Add Meals
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Diet
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}

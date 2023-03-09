import axios from "axios";
import {
  WORKOUTPLAN_FAIL,
  WORKOUTPLAN_REQUEST,
  WORKOUTPLAN_SUCCESS,
  WORKOUTPLAN_CREATE_FAIL,
  WORKOUTPLAN_CREATE_REQUEST,
  WORKOUTPLAN_CREATE_SUCCESS,
  WORKOUTPLAN_UPDATE_REQUEST,
  WORKOUTPLAN_UPDATE_FAIL,
  WORKOUTPLAN_UPDATE_SUCCESS,
  WORKOUTPLAN_DELETE_REQUEST,
  WORKOUTPLAN_DELETE_SUCCESS,
  WORKOUTPLAN_DELETE_FAIL,
} from "state/constants/workoutPlanConstants";

export const getWorkoutPlans = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKOUTPLAN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/workoutPlan/${id}`, config);

    dispatch({
      type: WORKOUTPLAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: WORKOUTPLAN_FAIL,
      payload: message,
    });
  }
};

export const createWorkoutPlans =
  (memberId, title, date, exercises) => async (dispatch, getState) => {
    try {
      dispatch({
        type: WORKOUTPLAN_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/workoutPlan/${memberId}`,
        { title, date, exercises },
        config
      );

      dispatch({
        type: WORKOUTPLAN_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: WORKOUTPLAN_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateWorkoutPlans =
  (memberId, workoutId, title, date, exercises) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: WORKOUTPLAN_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/workoutPlan/${memberId}/${workoutId}`,
        { title, date, exercises },
        config
      );

      dispatch({
        type: WORKOUTPLAN_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: WORKOUTPLAN_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteWorkoutPlans =
  (memberId, workoutId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: WORKOUTPLAN_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `/api/workoutPlan/${memberId}/${workoutId}`,
        config
      );

      dispatch({
        type: WORKOUTPLAN_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: WORKOUTPLAN_DELETE_FAIL,
        payload: message,
      });
    }
  };

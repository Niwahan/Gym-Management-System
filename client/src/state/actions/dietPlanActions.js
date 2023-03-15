import axios from "axios";
import {
  DIETPLAN_FAIL,
  DIETPLAN_REQUEST,
  DIETPLAN_SUCCESS,
  DIETPLAN_CREATE_FAIL,
  DIETPLAN_CREATE_REQUEST,
  DIETPLAN_CREATE_SUCCESS,
  DIETPLAN_UPDATE_REQUEST,
  DIETPLAN_UPDATE_FAIL,
  DIETPLAN_UPDATE_SUCCESS,
  DIETPLAN_DELETE_REQUEST,
  DIETPLAN_DELETE_SUCCESS,
  DIETPLAN_DELETE_FAIL,
} from "state/constants/dietPlanConstants";

export const getDietPlans = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DIETPLAN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/dietPlan/${id}`, config);

    dispatch({
      type: DIETPLAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DIETPLAN_FAIL,
      payload: message,
    });
  }
};

export const createDietPlans =
  (memberId, title, date, meals) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DIETPLAN_CREATE_REQUEST,
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
        `/api/dietPlan/${memberId}`,
        { title, date, meals },
        config
      );

      dispatch({
        type: DIETPLAN_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DIETPLAN_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateDietPlans =
  (memberId, dietId, title, date, meals) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DIETPLAN_UPDATE_REQUEST,
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
        `/api/dietPlan/${memberId}/${dietId}`,
        { title, date, meals },
        config
      );

      dispatch({
        type: DIETPLAN_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DIETPLAN_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteDietPlans =
  (memberId, dietId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DIETPLAN_DELETE_REQUEST,
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
        `/api/dietPlan/${memberId}/${dietId}`,
        config
      );

      dispatch({
        type: DIETPLAN_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DIETPLAN_DELETE_FAIL,
        payload: message,
      });
    }
  };

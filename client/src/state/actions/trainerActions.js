import axios from "axios";
import {
  TRAINER_FAIL,
  TRAINER_REQUEST,
  TRAINER_SUCCESS,
  TRAINER_CREATE_FAIL,
  TRAINER_CREATE_REQUEST,
  TRAINER_CREATE_SUCCESS,
  TRAINER_UPDATE_REQUEST,
  TRAINER_UPDATE_FAIL,
  TRAINER_UPDATE_SUCCESS,
  TRAINER_DELETE_REQUEST,
  TRAINER_DELETE_SUCCESS,
  TRAINER_DELETE_FAIL,
} from "state/constants/trainerConstants";

export const listTrainers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/trainers`, config);

    dispatch({
      type: TRAINER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TRAINER_FAIL,
      payload: message,
    });
  }
};

export const createTrainers =
  (name, email, password, address, phoneNumber, experience) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TRAINER_CREATE_REQUEST,
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
        `/api/trainers/create`,
        { name, email, password, address, phoneNumber, experience },
        config
      );

      dispatch({
        type: TRAINER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TRAINER_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateTrainers =
  (id, name, email, address, phoneNumber, experience) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TRAINER_UPDATE_REQUEST,
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
        `/api/trainers/${id}`,
        { name, email, address, phoneNumber, experience },
        config
      );

      dispatch({
        type: TRAINER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TRAINER_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteTrainers = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/trainers/${id}`, config);

    dispatch({
      type: TRAINER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TRAINER_DELETE_FAIL,
      payload: message,
    });
  }
};

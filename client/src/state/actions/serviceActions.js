import axios from "axios";
import {
  SERVICE_FAIL,
  SERVICE_REQUEST,
  SERVICE_SUCCESS,
  SERVICE_CREATE_FAIL,
  SERVICE_CREATE_REQUEST,
  SERVICE_CREATE_SUCCESS,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_FAIL,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_FAIL,
} from "state/constants/serviceConstants";

export const getServices = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/services`, config);

    dispatch({
      type: SERVICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SERVICE_FAIL,
      payload: message,
    });
  }
};

export const createServices =
  (name, description, price) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: SERVICE_CREATE_REQUEST,
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
        `/api/services/create`,
        { name, description, price },
        config
      );

      dispatch({
        type: SERVICE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SERVICE_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateServices =
  (id, name, description, price) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: SERVICE_UPDATE_REQUEST,
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
        `/api/services/${id}`,
        { name, description, price },
        config
      );

      dispatch({
        type: SERVICE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SERVICE_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteServices = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/services/${id}`, config);

    dispatch({
      type: SERVICE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SERVICE_DELETE_FAIL,
      payload: message,
    });
  }
};

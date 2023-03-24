import axios from "axios";
import {
  ANNOUNCEMENT_FAIL,
  ANNOUNCEMENT_REQUEST,
  ANNOUNCEMENT_SUCCESS,
  ANNOUNCEMENT_CREATE_FAIL,
  ANNOUNCEMENT_CREATE_REQUEST,
  ANNOUNCEMENT_CREATE_SUCCESS,
  ANNOUNCEMENT_DELETE_REQUEST,
  ANNOUNCEMENT_DELETE_SUCCESS,
  ANNOUNCEMENT_DELETE_FAIL,
} from "state/constants/announcementConstants";

export const getAnnouncements = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/announcements`, config);

    dispatch({
      type: ANNOUNCEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ANNOUNCEMENT_FAIL,
      payload: message,
    });
  }
};

export const createAnnouncements =
  (title, message) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ANNOUNCEMENT_CREATE_REQUEST,
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
        `/api/announcements/create`,
        { title, message },
        config
      );

      dispatch({
        type: ANNOUNCEMENT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ANNOUNCEMENT_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteAnnouncements = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/announcements/${id}`, config);

    dispatch({
      type: ANNOUNCEMENT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ANNOUNCEMENT_DELETE_FAIL,
      payload: message,
    });
  }
};

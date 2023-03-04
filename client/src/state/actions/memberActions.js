import axios from "axios";
import {
  MEMBER_FAIL,
  MEMBER_REQUEST,
  MEMBER_SUCCESS,
  MEMBER_CREATE_FAIL,
  MEMBER_CREATE_REQUEST,
  MEMBER_CREATE_SUCCESS,
  MEMBER_UPDATE_REQUEST,
  MEMBER_UPDATE_FAIL,
  MEMBER_UPDATE_SUCCESS,
  MEMBER_DELETE_REQUEST,
  MEMBER_DELETE_SUCCESS,
  MEMBER_DELETE_FAIL,
} from "state/constants/memberConstants";

export const getMembers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/members`, config);

    dispatch({
      type: MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MEMBER_FAIL,
      payload: message,
    });
  }
};

export const createMembers =
  (
    name,
    email,
    password,
    gender,
    address,
    phoneNumber,
    dateOfRegistration,
    trainerId,
    serviceId,
    plan
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_CREATE_REQUEST,
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
        `/api/members/create`,
        {
          name,
          email,
          password,
          gender,
          address,
          phoneNumber,
          dateOfRegistration,
          trainerId,
          serviceId,
          plan,
        },
        config
      );

      dispatch({
        type: MEMBER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEMBER_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateMembers =
  (
    id,
    name,
    email,
    gender,
    address,
    phoneNumber,
    trainerId,
    serviceId,
    plan
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_UPDATE_REQUEST,
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
        `/api/members/${id}`,
        {
          name,
          email,
          gender,
          address,
          phoneNumber,
          trainerId,
          serviceId,
          plan
        },
        config
      );

      dispatch({
        type: MEMBER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEMBER_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteMembers = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/members/${id}`, config);

    dispatch({
      type: MEMBER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MEMBER_DELETE_FAIL,
      payload: message,
    });
  }
};

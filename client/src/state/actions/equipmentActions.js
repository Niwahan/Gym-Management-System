import axios from "axios";
import {
  EQUIPMENT_FAIL,
  EQUIPMENT_REQUEST,
  EQUIPMENT_SUCCESS,
  EQUIPMENT_CREATE_FAIL,
  EQUIPMENT_CREATE_REQUEST,
  EQUIPMENT_CREATE_SUCCESS,
  EQUIPMENT_UPDATE_REQUEST,
  EQUIPMENT_UPDATE_FAIL,
  EQUIPMENT_UPDATE_SUCCESS,
  EQUIPMENT_DELETE_REQUEST,
  EQUIPMENT_DELETE_SUCCESS,
  EQUIPMENT_DELETE_FAIL,
} from "state/constants/equipmentConstants";

export const getEquipments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EQUIPMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/equipments`, config);

    dispatch({
      type: EQUIPMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: EQUIPMENT_FAIL,
      payload: message,
    });
  }
};

export const createEquipments =
  (name, description, quantity, price, purchasedDate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EQUIPMENT_CREATE_REQUEST,
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
        `/api/equipments/create`,
        { name, description, quantity, price, purchasedDate },
        config
      );

      dispatch({
        type: EQUIPMENT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: EQUIPMENT_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateEquipments =
  (id, name, description, quantity, price, purchasedDate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EQUIPMENT_UPDATE_REQUEST,
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
        `/api/equipments/${id}`,
        { name, description, quantity, price, purchasedDate },
        config
      );

      dispatch({
        type: EQUIPMENT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: EQUIPMENT_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteEquipments = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EQUIPMENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/equipments/${id}`, config);

    dispatch({
      type: EQUIPMENT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: EQUIPMENT_DELETE_FAIL,
      payload: message,
    });
  }
};

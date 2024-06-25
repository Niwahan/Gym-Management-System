import axios from "axios";
import {
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
} from "state/constants/paymentConstants";

export const makePayment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_REQUEST,
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

    const { data } = await axios.post(process.env.REACT_APP_BASE_URL + `/api/payment/${id}`, config);

    dispatch({
      type: PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PAYMENT_FAIL,
      payload: message,
    });
  }
};

import axios from "axios";
import {
  MEMBER_PROGRESS_UPDATE_REQUEST,
  MEMBER_PROGRESS_UPDATE_SUCCESS,
  MEMBER_PROGRESS_UPDATE_FAIL,
} from "state/constants/memberProgressConstants";

export const updateMembersProgress =
  (id, initialWeight, finalWeight, initialBodyType, finalBodyType) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_PROGRESS_UPDATE_REQUEST,
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
        `/api/membersProgress/${id}`,
        {
          initialWeight,
          finalWeight,
          initialBodyType,
          finalBodyType,
        },
        config
      );
      console.log(data);

      dispatch({
        type: MEMBER_PROGRESS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEMBER_PROGRESS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

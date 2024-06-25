import axios from "axios";
import {
  MEMBER_ATTENDANCE_CHECKIN_REQUEST,
  MEMBER_ATTENDANCE_CHECKIN_SUCCESS,
  MEMBER_ATTENDANCE_CHECKIN_FAIL,
} from "../constants/attendanceConstants";

export const memberAttendanceCheckin = (_id) => async (dispatch) => {
  try {
    dispatch({ type: MEMBER_ATTENDANCE_CHECKIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      process.env.REACT_APP_BASE_URL + `/api/attendance/checkin`,
      { _id },
      config
    );

    dispatch({
      type: MEMBER_ATTENDANCE_CHECKIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEMBER_ATTENDANCE_CHECKIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(error);
  }
};

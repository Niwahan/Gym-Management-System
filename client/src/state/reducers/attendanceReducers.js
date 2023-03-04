import {
  MEMBER_ATTENDANCE_CHECKIN_REQUEST,
  MEMBER_ATTENDANCE_CHECKIN_SUCCESS,
  MEMBER_ATTENDANCE_CHECKIN_FAIL,
} from "../constants/attendanceConstants";

export const memberAttendanceCheckinReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case MEMBER_ATTENDANCE_CHECKIN_REQUEST:
      return { loading: true };
    case MEMBER_ATTENDANCE_CHECKIN_SUCCESS:
      return { loading: false, success: true };
    case MEMBER_ATTENDANCE_CHECKIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

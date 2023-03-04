import {
  MEMBER_PROGRESS_UPDATE_REQUEST,
  MEMBER_PROGRESS_UPDATE_SUCCESS,
  MEMBER_PROGRESS_UPDATE_FAIL,
} from "state/constants/memberProgressConstants";

export const memberProgressUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_PROGRESS_UPDATE_REQUEST:
      return { loading: true };
    case MEMBER_PROGRESS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case MEMBER_PROGRESS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

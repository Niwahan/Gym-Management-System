import {
  WORKOUTPLAN_FAIL,
  WORKOUTPLAN_REQUEST,
  WORKOUTPLAN_SUCCESS,
  WORKOUTPLAN_CREATE_REQUEST,
  WORKOUTPLAN_CREATE_SUCCESS,
  WORKOUTPLAN_CREATE_FAIL,
  WORKOUTPLAN_CREATE_RESET,
  WORKOUTPLAN_UPDATE_FAIL,
  WORKOUTPLAN_UPDATE_REQUEST,
  WORKOUTPLAN_UPDATE_RESET,
  WORKOUTPLAN_UPDATE_SUCCESS,
  WORKOUTPLAN_DELETE_REQUEST,
  WORKOUTPLAN_DELETE_SUCCESS,
  WORKOUTPLAN_DELETE_FAIL,
} from "state/constants/workoutPlanConstants";

export const workoutplanReducer = (
  state = { workoutplansInfo: [] },
  action
) => {
  switch (action.type) {
    case WORKOUTPLAN_REQUEST:
      return { loading: true, workoutplansInfo: [] };
    case WORKOUTPLAN_SUCCESS:
      return { loading: false, workoutplansInfo: action.payload };
    case WORKOUTPLAN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const workoutplanCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKOUTPLAN_CREATE_REQUEST:
      return { loading: true };
    case WORKOUTPLAN_CREATE_SUCCESS:
      return { loading: false, success: true };
    case WORKOUTPLAN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WORKOUTPLAN_CREATE_RESET:
      return { success: false, error: null };
    default:
      return state;
  }
};

export const workoutplanUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKOUTPLAN_UPDATE_REQUEST:
      return { loading: true };
    case WORKOUTPLAN_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case WORKOUTPLAN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case WORKOUTPLAN_UPDATE_RESET:
      return { success: false, error: null };
    default:
      return state;
  }
};
export const workoutplanDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKOUTPLAN_DELETE_REQUEST:
      return { loading: true };
    case WORKOUTPLAN_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WORKOUTPLAN_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

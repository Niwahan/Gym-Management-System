import {
  TRAINER_FAIL,
  TRAINER_REQUEST,
  TRAINER_SUCCESS,
  TRAINER_CREATE_REQUEST,
  TRAINER_CREATE_SUCCESS,
  TRAINER_CREATE_FAIL,
  TRAINER_CREATE_RESET,
  TRAINER_UPDATE_FAIL,
  TRAINER_UPDATE_REQUEST,
  TRAINER_UPDATE_RESET,
  TRAINER_UPDATE_SUCCESS,
  TRAINER_DELETE_REQUEST,
  TRAINER_DELETE_SUCCESS,
  TRAINER_DELETE_FAIL
} from "state/constants/trainerConstants";

export const trainerReducer = (state = { trainers: [] }, action) => {
  switch (action.type) {
    case TRAINER_REQUEST:
      return { loading: true };
    case TRAINER_SUCCESS:
      return { loading: false, trainersInfo: action.payload };
    case TRAINER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const trainerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINER_CREATE_REQUEST:
      return { loading: true };
    case TRAINER_CREATE_SUCCESS:
      return { loading: false, success: true };
    case TRAINER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINER_CREATE_RESET:
      return {success: false, error: null}
    default:
      return state;
  }
};

export const trainerUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINER_UPDATE_REQUEST:
      return { loading: true };
    case TRAINER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TRAINER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINER_UPDATE_RESET:
      return {success: false, error: null}
    default:
      return state;
  }
};
export const trainerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINER_DELETE_REQUEST:
      return { loading: true };
    case TRAINER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TRAINER_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
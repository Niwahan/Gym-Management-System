import {
    DIETPLAN_FAIL,
    DIETPLAN_REQUEST,
    DIETPLAN_SUCCESS,
    DIETPLAN_CREATE_REQUEST,
    DIETPLAN_CREATE_SUCCESS,
    DIETPLAN_CREATE_FAIL,
    DIETPLAN_CREATE_RESET,
    DIETPLAN_UPDATE_FAIL,
    DIETPLAN_UPDATE_REQUEST,
    DIETPLAN_UPDATE_RESET,
    DIETPLAN_UPDATE_SUCCESS,
    DIETPLAN_DELETE_REQUEST,
    DIETPLAN_DELETE_SUCCESS,
    DIETPLAN_DELETE_FAIL,
  } from "state/constants/dietPlanConstants";
  
  export const dietplanReducer = (
    state = { dietplansInfo: [] },
    action
  ) => {
    switch (action.type) {
      case DIETPLAN_REQUEST:
        return { loading: true, dietplansInfo: [] };
      case DIETPLAN_SUCCESS:
        return { loading: false, dietplansInfo: action.payload };
      case DIETPLAN_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const dietplanCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case DIETPLAN_CREATE_REQUEST:
        return { loading: true };
      case DIETPLAN_CREATE_SUCCESS:
        return { loading: false, success: true };
      case DIETPLAN_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case DIETPLAN_CREATE_RESET:
        return { success: false, error: null };
      default:
        return state;
    }
  };
  
  export const dietplanUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case DIETPLAN_UPDATE_REQUEST:
        return { loading: true };
      case DIETPLAN_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case DIETPLAN_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case DIETPLAN_UPDATE_RESET:
        return { success: false, error: null };
      default:
        return state;
    }
  };
  export const dietplanDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case DIETPLAN_DELETE_REQUEST:
        return { loading: true };
      case DIETPLAN_DELETE_SUCCESS:
        return { loading: false, success: true };
      case DIETPLAN_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  
import {
    EQUIPMENT_FAIL,
    EQUIPMENT_REQUEST,
    EQUIPMENT_SUCCESS,
    EQUIPMENT_CREATE_REQUEST,
    EQUIPMENT_CREATE_SUCCESS,
    EQUIPMENT_CREATE_FAIL,
    EQUIPMENT_CREATE_RESET,
    EQUIPMENT_UPDATE_FAIL,
    EQUIPMENT_UPDATE_REQUEST,
    EQUIPMENT_UPDATE_RESET,
    EQUIPMENT_UPDATE_SUCCESS,
    EQUIPMENT_DELETE_REQUEST,
    EQUIPMENT_DELETE_SUCCESS,
    EQUIPMENT_DELETE_FAIL
  } from "state/constants/equipmentConstants";
  
  export const equipmentReducer = (state = { equipments: [] }, action) => {
    switch (action.type) {
      case EQUIPMENT_REQUEST:
        return { loading: true };
      case EQUIPMENT_SUCCESS:
        return { loading: false, equipmentsInfo: action.payload };
      case EQUIPMENT_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const equipmentCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case EQUIPMENT_CREATE_REQUEST:
        return { loading: true };
      case EQUIPMENT_CREATE_SUCCESS:
        return { loading: false, success: true };
      case EQUIPMENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case EQUIPMENT_CREATE_RESET:
        return {success: false, error: null}
      default:
        return state;
    }
  };
  
  export const equipmentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case EQUIPMENT_UPDATE_REQUEST:
        return { loading: true };
      case EQUIPMENT_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case EQUIPMENT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case EQUIPMENT_UPDATE_RESET:
        return {success: false, error: null}
      default:
        return state;
    }
  };
  export const equipmentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case EQUIPMENT_DELETE_REQUEST:
        return { loading: true };
      case EQUIPMENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case EQUIPMENT_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
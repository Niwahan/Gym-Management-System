import {
  SERVICE_FAIL,
  SERVICE_REQUEST,
  SERVICE_SUCCESS,
  SERVICE_CREATE_REQUEST,
  SERVICE_CREATE_SUCCESS,
  SERVICE_CREATE_FAIL,
  SERVICE_CREATE_RESET,
  SERVICE_UPDATE_FAIL,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_RESET,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_FAIL,
} from "state/constants/serviceConstants";

export const serviceReducer = (state = { services: [] }, action) => {
  switch (action.type) {
    case SERVICE_REQUEST:
      return { loading: true, servicesInfo: [] };
    case SERVICE_SUCCESS:
      return { loading: false, servicesInfo: action.payload };
    case SERVICE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const serviceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_CREATE_REQUEST:
      return { loading: true };
    case SERVICE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case SERVICE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SERVICE_CREATE_RESET:
      return { success: false, error: null };
    default:
      return state;
  }
};

export const serviceUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_UPDATE_REQUEST:
      return { loading: true };
    case SERVICE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SERVICE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SERVICE_UPDATE_RESET:
      return { success: false, error: null };
    default:
      return state;
  }
};
export const serviceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_DELETE_REQUEST:
      return { loading: true };
    case SERVICE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SERVICE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

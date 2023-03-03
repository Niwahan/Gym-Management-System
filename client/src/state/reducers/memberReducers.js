import {
    MEMBER_FAIL,
    MEMBER_REQUEST,
    MEMBER_SUCCESS,
    MEMBER_CREATE_REQUEST,
    MEMBER_CREATE_SUCCESS,
    MEMBER_CREATE_FAIL,
    MEMBER_CREATE_RESET,
    MEMBER_UPDATE_FAIL,
    MEMBER_UPDATE_REQUEST,
    MEMBER_UPDATE_RESET,
    MEMBER_UPDATE_SUCCESS,
    MEMBER_DELETE_REQUEST,
    MEMBER_DELETE_SUCCESS,
    MEMBER_DELETE_FAIL
  } from "state/constants/memberConstants";
  
  export const memberReducer = (state = { members: [] }, action) => {
    switch (action.type) {
      case MEMBER_REQUEST:
        return { loading: true };
      case MEMBER_SUCCESS:
        return { loading: false, membersInfo: action.payload };
      case MEMBER_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const memberCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBER_CREATE_REQUEST:
        return { loading: true };
      case MEMBER_CREATE_SUCCESS:
        return { loading: false, success: true };
      case MEMBER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case MEMBER_CREATE_RESET:
        return {success: false, error: null}
      default:
        return state;
    }
  };
  
  export const memberUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBER_UPDATE_REQUEST:
        return { loading: true };
      case MEMBER_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case MEMBER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case MEMBER_UPDATE_RESET:
        return {success: false, error: null}
      default:
        return state;
    }
  };
  export const memberDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBER_DELETE_REQUEST:
        return { loading: true };
      case MEMBER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case MEMBER_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
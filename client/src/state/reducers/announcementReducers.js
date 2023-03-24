import {
    ANNOUNCEMENT_FAIL,
    ANNOUNCEMENT_REQUEST,
    ANNOUNCEMENT_SUCCESS,
    ANNOUNCEMENT_CREATE_REQUEST,
    ANNOUNCEMENT_CREATE_SUCCESS,
    ANNOUNCEMENT_CREATE_FAIL,
    ANNOUNCEMENT_CREATE_RESET,
    ANNOUNCEMENT_DELETE_REQUEST,
    ANNOUNCEMENT_DELETE_SUCCESS,
    ANNOUNCEMENT_DELETE_FAIL,
  } from "state/constants/announcementConstants";
  
  export const announcementReducer = (state = { announcements: [] }, action) => {
    switch (action.type) {
      case ANNOUNCEMENT_REQUEST:
        return { loading: true };
      case ANNOUNCEMENT_SUCCESS:
        return { loading: false, announcementsInfo: action.payload };
      case ANNOUNCEMENT_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const announcementCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ANNOUNCEMENT_CREATE_REQUEST:
        return { loading: true };
      case ANNOUNCEMENT_CREATE_SUCCESS:
        return { loading: false, success: true };
      case ANNOUNCEMENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case ANNOUNCEMENT_CREATE_RESET:
        return { success: false, error: null };
      default:
        return state;
    }
  };
  
  export const announcementDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ANNOUNCEMENT_DELETE_REQUEST:
        return { loading: true };
      case ANNOUNCEMENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ANNOUNCEMENT_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  
import { configureStore } from "@reduxjs/toolkit";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
// import { setupListeners } from "@reduxjs/toolkit/query";
import globalReducer from "state/modeTogglerSlice";
import { trainerCreateReducer, trainerDeleteReducer, trainerReducer, trainerUpdateReducer } from "./reducers/trainerReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage, loading: false, error: null },
  userRegistration: {loading: false, error: null, userInfo: userInfoFromStorage},
  trainers: {loading: false, error: null, trainers: []}
  
};

const store = configureStore({
  reducer: {
    global: globalReducer,
    userLogin: userLoginReducer,
    userRegistration: userRegisterReducer,
    trainers: trainerReducer,
    trainerCreate: trainerCreateReducer,
    trainerUpdate: trainerUpdateReducer,
    trainerDelete: trainerDeleteReducer

  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware();
    return [...defaultMiddleware];
  },
  preloadedState: initialState,
  devTools: true,
});
// setupListeners(store.dispatch);

export default store;

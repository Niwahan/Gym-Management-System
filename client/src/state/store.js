import { configureStore } from "@reduxjs/toolkit";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
// import { setupListeners } from "@reduxjs/toolkit/query";
import globalReducer from "state/modeTogglerSlice";
import {
  trainerCreateReducer,
  trainerDeleteReducer,
  trainerReducer,
  trainerUpdateReducer,
} from "./reducers/trainerReducers";
import {
  serviceCreateReducer,
  serviceDeleteReducer,
  serviceReducer,
  serviceUpdateReducer,
} from "./reducers/serviceReducers";
import { equipmentCreateReducer, equipmentDeleteReducer, equipmentReducer, equipmentUpdateReducer } from "./reducers/equipmentReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage, loading: false, error: null },
};

const store = configureStore({
  reducer: {
    global: globalReducer,
    userLogin: userLoginReducer,
    userRegistration: userRegisterReducer,
    trainers: trainerReducer,
    trainerCreate: trainerCreateReducer,
    trainerUpdate: trainerUpdateReducer,
    trainerDelete: trainerDeleteReducer,
    services: serviceReducer,
    serviceCreate: serviceCreateReducer,
    serviceUpdate: serviceUpdateReducer,
    serviceDelete: serviceDeleteReducer,
    equipments: equipmentReducer,
    equipmentCreate: equipmentCreateReducer,
    equipmentUpdate: equipmentUpdateReducer,
    equipmentDelete: equipmentDeleteReducer
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

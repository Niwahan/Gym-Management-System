import {
  configureStore,
  //   combineReducers,
  //   applyMiddleware,
  //   getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
// import { setupListeners } from "@reduxjs/toolkit/query";
import globalReducer from "state";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    global: globalReducer,
    userLogin: userLoginReducer,
    userRegistration: userRegisterReducer,
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

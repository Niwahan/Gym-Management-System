import { configureStore } from "@reduxjs/toolkit";
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducers";
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
  ServiceOverviewReducer,
  serviceReducer,
  serviceUpdateReducer,
} from "./reducers/serviceReducers";
import {
  equipmentCreateReducer,
  equipmentDeleteReducer,
  equipmentReducer,
  equipmentUpdateReducer,
} from "./reducers/equipmentReducers";
import {
  memberCreateReducer,
  memberDeleteReducer,
  memberReducer,
  memberUpdateReducer,
} from "./reducers/memberReducers";
import { memberAttendanceCheckinReducer } from "./reducers/attendanceReducers";
import { memberProgressUpdateReducer } from "./reducers/memberProgressReducers";
import {
  workoutplanCreateReducer,
  workoutplanDeleteReducer,
  workoutplanReducer,
  workoutplanUpdateReducer,
} from "./reducers/workoutPlanReducers";
import {
  dietplanCreateReducer,
  dietplanDeleteReducer,
  dietplanReducer,
  dietplanUpdateReducer,
} from "./reducers/dietPlanReducers";
import { makePaymentReducer } from "./reducers/paymentReducers";
import {
  announcementCreateReducer,
  announcementDeleteReducer,
  announcementReducer,
} from "./reducers/announcementReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage, loading: false, error: null },
  services: { loading: false, servicesInfo: [] },
  trainers: { loading: false, trainersInfo: [] },
};

const store = configureStore({
  reducer: {
    global: globalReducer,
    userLogin: userLoginReducer,
    userRegistration: userRegisterReducer,
    userUpdate: userUpdateReducer,
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
    equipmentDelete: equipmentDeleteReducer,
    members: memberReducer,
    memberCreate: memberCreateReducer,
    memberUpdate: memberUpdateReducer,
    memberDelete: memberDeleteReducer,
    memberAttendanceCheckin: memberAttendanceCheckinReducer,
    memberProgressUpdate: memberProgressUpdateReducer,
    workoutPlan: workoutplanReducer,
    workoutPlanCreate: workoutplanCreateReducer,
    workoutPlanUpdate: workoutplanUpdateReducer,
    workoutPlanDelete: workoutplanDeleteReducer,
    dietPlan: dietplanReducer,
    dietPlanCreate: dietplanCreateReducer,
    dietPlanUpdate: dietplanUpdateReducer,
    dietPlanDelete: dietplanDeleteReducer,
    makePayment: makePaymentReducer,
    serviceOverview: ServiceOverviewReducer,
    announcements: announcementReducer,
    announcementCreate: announcementCreateReducer,
    announcementDelete: announcementDeleteReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware();
    return [...defaultMiddleware];
  },
  preloadedState: initialState,
  devTools: true,
});

export default store;

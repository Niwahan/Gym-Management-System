import { createSlice } from "@reduxjs/toolkit";

const hour = new Date().getHours();
const isDarkMode = hour >= 18 || hour < 6; // set to dark mode between 6pm and 6am

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    mode: isDarkMode ? "dark" : "light", // set initial mode based on system time
  },
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;

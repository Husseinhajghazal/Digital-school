import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const sidebarReducer = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleShowBar: (state, action) => {
      state.show = !state.show;
    },
  },
});

export const { toggleShowBar } = sidebarReducer.actions;

export default sidebarReducer.reducer;

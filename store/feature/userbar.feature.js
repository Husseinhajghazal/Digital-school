import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const userbarReducer = createSlice({
  name: "userbar",
  initialState,
  reducers: {
    toggleShow: (state, action) => {
      state.show = !state.show;
    },
    DonotShow: (state, action) => {
      state.show = false;
    },
  },
});

export const { toggleShow, DonotShow } = userbarReducer.actions;

export default userbarReducer.reducer;

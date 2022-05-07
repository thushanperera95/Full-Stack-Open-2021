import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggles",
  initialState: {},
  reducers: {
    show(state, action) {
      return { ...state, [action.payload]: true };
    },
    hide(state, action) {
      return { ...state, [action.payload]: false };
    },
  },
});

export const { show, hide } = toggleSlice.actions;

export const showToggle = (id) => {
  return (dispatch) => {
    dispatch(show(id));
  };
};

export const hideToggle = (id) => {
  return (dispatch) => {
    dispatch(hide(id));
  };
};

export default toggleSlice.reducer;

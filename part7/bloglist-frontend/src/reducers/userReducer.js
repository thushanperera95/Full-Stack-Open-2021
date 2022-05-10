import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload;
    },
  },
});

export const { set } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(set(users));
    } catch (exception) {
      dispatch(displayErrorNotification(exception.response.data.error));
    }
  };
};

export default userSlice.reducer;

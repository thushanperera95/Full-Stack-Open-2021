import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import {
  displayErrorNotification,
  displayInfoNotification,
} from "./notificationReducer";

const authSlice = createSlice({
  name: "authenticatedUser",
  initialState: JSON.parse(localStorage.getItem("loggedBlogappUser")),
  reducers: {
    set(state, action) {
      return action.payload;
    },
    reset(state, action) {
      return null;
    },
  },
});

export const { set, reset } = authSlice.actions;

export const initializeSession = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(set(user));
      blogService.setToken(user.token);
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(set(user));
    } catch (exception) {
      window.localStorage.removeItem("loggedBlogappUser");
      dispatch(displayErrorNotification(exception.response.data.error));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(reset());
    blogService.setToken(null);
    dispatch(displayInfoNotification("you have logged out"));
  };
};

export default authSlice.reducer;

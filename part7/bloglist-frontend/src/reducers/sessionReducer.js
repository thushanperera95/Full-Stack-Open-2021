import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { displayErrorNotification } from "./notificationReducer";

const sessionSlice = createSlice({
  name: "session",
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    reset(state, action) {
      return null;
    },
  },
});

export const { set, reset } = sessionSlice.actions;

export const initializeSession = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(set(user));
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(set(user));
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      dispatch(displayErrorNotification(exception.response.data.error));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(reset());
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
  };
};

export default sessionSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../reducers/blogReducer";
import notificationReducer from "../reducers/notificationReducer";
import authReducer from "../reducers/authReducer";
import toggleReducer from "../reducers/toggleReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    toggles: toggleReducer,
    authenticatedUser: authReducer,
  },
});

export default store;

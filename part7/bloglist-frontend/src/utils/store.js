import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../reducers/blogReducer";
import notificationReducer from "../reducers/notificationReducer";
import sessionReducer from "../reducers/sessionReducer";
import toggleReducer from "../reducers/toggleReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    toggles: toggleReducer,
    session: sessionReducer,
  },
});

export default store;

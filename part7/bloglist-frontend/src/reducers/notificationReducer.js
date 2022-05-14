import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notify(state, action) {
      return action.payload;
    },
    reset() {
      return null;
    },
  },
});

export const { notify, reset } = notificationSlice.actions;

let timer;
const setClearNotificationTimer = (dispatch, timeIntervalSeconds = 5) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    dispatch(reset());
  }, timeIntervalSeconds * 1000);
};

export const displayInfoNotification = (message) => {
  return (dispatch) => {
    dispatch(notify({ message, type: "success" }));
    setClearNotificationTimer(dispatch);
  };
};

export const displayErrorNotification = (message) => {
  return (dispatch) => {
    dispatch(notify({ message, type: "error" }));
    setClearNotificationTimer(dispatch);
  };
};

export default notificationSlice.reducer;

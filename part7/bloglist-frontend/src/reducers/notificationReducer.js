import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    type: "",
    style: {
      display: "none",
    },
  },
  reducers: {
    notify(state, action) {
      return action.payload;
    },
    reset() {
      return {
        message: "",
        type: "",
        style: {
          display: "none",
        },
      };
    },
  },
});

export const { notify, reset } = notificationSlice.actions;

let timer;
const clearNotificationTimer = (dispatch, timeIntervalSeconds = 5) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    dispatch(reset());
  }, timeIntervalSeconds * 1000);
};

export const displayInfoNotification = (message) => {
  return async (dispatch) => {
    const style = {
      color: "green",
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "20px",
    };

    dispatch(notify({ message, type: "info", style }));
    clearNotificationTimer(dispatch);
  };
};

export const displayErrorNotification = (message) => {
  return async (dispatch) => {
    const style = {
      color: "red",
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "20px",
    };

    dispatch(notify({ message, type: "error", style }));
    clearNotificationTimer(dispatch);
  };
};

export default notificationSlice.reducer;

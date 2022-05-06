import deepFreeze from "deep-freeze";
import notificationReducer from "./notificationReducer";

describe("notification reducer", () => {
  test("returns initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = notificationReducer(undefined, action);
    expect(newState).toEqual("");
  });

  test("notify results in state set to the notification message", () => {
    const action = {
      type: "notification/notify",
      payload: "test notification",
    };
    const initialState = "";

    deepFreeze(initialState);
    const newState = notificationReducer(initialState, action);
    expect(newState).toEqual("test notification");
  });

  test("reset results in state set to an empty string", () => {
    const action = {
      type: "notification/reset",
    };
    const initialState = "test notification";

    deepFreeze(initialState);
    const newState = notificationReducer(initialState, action);
    expect(newState).toEqual("");
  });
});

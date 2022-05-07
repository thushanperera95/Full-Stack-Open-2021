import deepFreeze from "deep-freeze";
import notificationReducer from "./notificationReducer";

describe("notification reducer", () => {
  test("returns initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = notificationReducer(undefined, action);
    expect(newState).toEqual(null);
  });

  test("notify results in state set to the notification message", () => {
    const action = {
      type: "notification/notify",
      payload: { message: "test notification", type: "test" },
    };

    const newState = notificationReducer(undefined, action);
    expect(newState.message).toEqual("test notification");
    expect(newState.type).toEqual("test");
  });

  test("reset results in state set to an empty string", () => {
    const action = {
      type: "notification/reset",
    };
    const initialState = { message: "test notification", type: "test" };

    deepFreeze(initialState);
    const newState = notificationReducer(initialState, action);
    expect(newState).toEqual(null);
  });
});

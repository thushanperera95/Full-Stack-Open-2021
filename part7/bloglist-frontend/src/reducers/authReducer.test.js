import authReducer from "./authReducer";

describe("auth reducer", () => {
  test("returns initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = authReducer(undefined, action);
    expect(newState).toEqual(null);
  });

  test("set results in state set to the authenticated user", () => {
    const action = {
      type: "authenticatedUser/set",
      payload: "testauthenticationtoken",
    };

    const newState = authReducer(null, action);
    expect(newState).toEqual("testauthenticationtoken");
  });

  test("reset results in state set to null", () => {
    const action = {
      type: "authenticatedUser/reset",
    };

    const initialState = "testauthenticationtoken";
    const newState = authReducer(initialState, action);
    expect(newState).toEqual(null);
  });
});

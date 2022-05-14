import userReducer from "./userReducer";

describe("auth reducer", () => {
  test("returns initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = userReducer(undefined, action);
    expect(newState).toEqual([]);
  });

  test("set results in state set to the authenticated user", () => {
    const action = {
      type: "users/set",
      payload: [{ name: "test name", username: "testusername" }],
    };

    const newState = userReducer(null, action);
    expect(newState[0].name).toEqual("test name");
    expect(newState[0].username).toEqual("testusername");
  });
});

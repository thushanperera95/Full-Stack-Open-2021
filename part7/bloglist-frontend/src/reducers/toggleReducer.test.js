import deepFreeze from "deep-freeze";
import toggleReducer from "./toggleReducer";

describe("toggle reducer", () => {
  test("returns initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = toggleReducer(undefined, action);
    expect(newState).toEqual({});
  });

  test("show results in toggle set to true in state", () => {
    const action = {
      type: "toggles/show",
      payload: "TEST_TOGGLE",
    };

    const initialState = {
      TEST_TOGGLE: false,
      OTHER_TOGGLE: false,
    };

    deepFreeze(initialState);
    const newState = toggleReducer(initialState, action);
    expect(newState["TEST_TOGGLE"]).toEqual(true);
    expect(newState["OTHER_TOGGLE"]).toEqual(false);
  });

  test("hide results in toggle set to false in state", () => {
    const action = {
      type: "toggles/hide",
      payload: "TEST_TOGGLE",
    };

    const initialState = {
      TEST_TOGGLE: true,
      OTHER_TOGGLE: false,
    };

    deepFreeze(initialState);
    const newState = toggleReducer(initialState, action);
    expect(newState["TEST_TOGGLE"]).toEqual(false);
    expect(newState["OTHER_TOGGLE"]).toEqual(false);
  });

  test("show with new toggle will result in toggle added to state", () => {
    const action = {
      type: "toggles/show",
      payload: "TEST_TOGGLE",
    };

    const initialState = {
      OTHER_TOGGLE: false,
    };

    deepFreeze(initialState);
    const newState = toggleReducer(initialState, action);
    expect(newState["TEST_TOGGLE"]).toEqual(true);
    expect(newState["OTHER_TOGGLE"]).toEqual(false);
  });

  test("hide with new toggle will result in toggle added to state", () => {
    const action = {
      type: "toggles/hide",
      payload: "TEST_TOGGLE",
    };

    const initialState = {
      OTHER_TOGGLE: true,
    };

    deepFreeze(initialState);
    const newState = toggleReducer(initialState, action);
    expect(newState["TEST_TOGGLE"]).toEqual(false);
    expect(newState["OTHER_TOGGLE"]).toEqual(true);
  });
});

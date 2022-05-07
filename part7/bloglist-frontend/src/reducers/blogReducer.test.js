import deepFreeze from "deep-freeze";
import blogReducer from "./blogReducer";

describe("blog reducer", () => {
  test("returns initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = blogReducer(undefined, action);
    expect(newState).toEqual([]);
  });

  test("initialize results in state set to array of blogs", () => {
    const action = {
      type: "blogs/setBlogs",
      payload: [
        {
          title: "test",
          author: "test2",
          url: "test3",
        },
        {
          title: "test4",
          author: "test5",
          url: "test6",
        },
      ],
    };

    const newState = blogReducer(undefined, action);
    expect(newState[0].title).toEqual("test");
    expect(newState[0].author).toEqual("test2");
    expect(newState[0].url).toEqual("test3");
    expect(newState[1].title).toEqual("test4");
    expect(newState[1].author).toEqual("test5");
    expect(newState[1].url).toEqual("test6");
  });

  test("add results in state updated to include the new blog", () => {
    const action = {
      type: "blogs/add",
      payload: {
        title: "test4",
        author: "test5",
        url: "test6",
      },
    };

    const initialState = [
      {
        title: "test",
        author: "test2",
        url: "test3",
      },
    ];

    deepFreeze(initialState);
    const newState = blogReducer(initialState, action);
    expect(newState[0].title).toEqual("test");
    expect(newState[0].author).toEqual("test2");
    expect(newState[0].url).toEqual("test3");
    expect(newState[1].title).toEqual("test4");
    expect(newState[1].author).toEqual("test5");
    expect(newState[1].url).toEqual("test6");
  });
});

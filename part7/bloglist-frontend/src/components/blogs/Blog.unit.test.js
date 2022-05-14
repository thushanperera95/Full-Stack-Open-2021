import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";
import { Provider } from "react-redux";
import store from "../../utils/store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

beforeAll;

describe("renders content", () => {
  test("title and author are correctly displayed", () => {
    const history = createMemoryHistory();

    const blog = {
      title: "Test Title",
      author: "Test Author",
      url: "www.test.test",
      likes: 50,
      id: "testid",
    };

    const { container } = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Blog blog={blog} />
        </Router>
      </Provider>
    );

    const titleElement = container.querySelector("#blog-title");
    expect(titleElement).toHaveTextContent("Test Title");

    const authorElement = container.querySelector("#blog-author");
    expect(authorElement).toHaveTextContent("Test Author");
  });

  test("routes to blog details page when title is clicked", () => {
    const history = createMemoryHistory();

    const blog = {
      title: "Test Title",
      author: "Test Author",
      url: "www.test.test",
      likes: 50,
      id: "testid",
    };

    const { container } = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Blog blog={blog} />
        </Router>
      </Provider>
    );

    const titleLink = container.querySelector("#blog-title-link");
    expect(titleLink).toHaveAttribute("href", "/blogs/testid");
  });
});

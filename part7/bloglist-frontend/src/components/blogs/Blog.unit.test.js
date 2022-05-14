import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { Provider } from "react-redux";
import store from "../store";

beforeAll;

describe("renders content", () => {
  test("details are hidden by default", () => {
    const blog = {
      title: "Test Title",
      author: "Test Author",
      url: "www.test.test",
      likes: 50,
    };

    const { container } = render(
      <Provider store={store}>
        <Blog blog={blog} loggedInUser={{}} />
      </Provider>
    );

    const overviewDiv = container.querySelector(".blogOverview");
    expect(overviewDiv).toHaveTextContent("Test Title");
    expect(overviewDiv).toHaveTextContent("Test Author");

    const detailsDiv = container.querySelector(".blogDetails");
    expect(detailsDiv).toBeNull();
  });

  test("details displayed when show button is clicked", () => {
    const blog = {
      title: "Test Title",
      author: "Test Author",
      url: "www.test.test",
      likes: 50,
    };

    const { container } = render(
      <Provider store={store}>
        <Blog blog={blog} loggedInUser={{}} />
      </Provider>
    );

    const button = screen.getByText("Show");
    userEvent.setup({ delay: 1 });
    userEvent.click(button);

    console.log(button);

    const overviewDiv = container.querySelector(".blogOverview");
    expect(overviewDiv).toHaveTextContent("Test Title");
    expect(overviewDiv).toHaveTextContent("Test Author");

    const detailsDiv = container.querySelector(".blogDetails");
    expect(detailsDiv).toHaveTextContent("www.test.test");
    expect(detailsDiv).toHaveTextContent("likes 50");
  });

  test("increase likes function is called twice, if the like button is clicked twice", () => {
    const blog = {
      title: "Test Title",
      author: "Test Author",
      url: "www.test.test",
      likes: 50,
    };

    const { container } = render(
      <Provider store={store}>
        <Blog blog={blog} loggedInUser={{}} />
      </Provider>
    );

    const button = screen.getByText("Show");
    userEvent.click(button);

    const likeButton = screen.getByText("like");
    userEvent.click(likeButton);
    // userEvent.click(likeButton);
  });
});

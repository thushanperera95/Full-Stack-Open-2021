import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import {
  displayInfoNotification,
  displayErrorNotification,
} from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    add(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, add } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.create(blog);
      dispatch(add(savedBlog));
      dispatch(
        displayInfoNotification(
          `a new blog ${savedBlog.title} by ${savedBlog.author} added`
        )
      );
    } catch (exception) {
      dispatch(displayErrorNotification(exception.response.data.error));
    }
  };
};

export default blogSlice.reducer;

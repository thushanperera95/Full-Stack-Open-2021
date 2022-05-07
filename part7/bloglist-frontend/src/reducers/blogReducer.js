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
    update(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },
    remove(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, add, update, remove } = blogSlice.actions;

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

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const blogCopy = { ...blog, likes: blog.likes + 1 };
      const updatedBlog = await blogService.update(blogCopy.id, blogCopy);
      dispatch(update(updatedBlog));
    } catch (exception) {
      console.log(exception);
      dispatch(displayErrorNotification(exception.response.data.error));
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(remove(id));
    } catch (exception) {
      dispatch(displayErrorNotification(exception.response.data.error));
    }
  };
};

export default blogSlice.reducer;

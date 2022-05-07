import React, { useState, useEffect, useRef } from "react";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import LoginDetails from "./components/LoginDetails";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import {
  displayInfoNotification,
  displayErrorNotification,
} from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";

function App() {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const [user, setUser] = useState(null);

  const blogFormToggleRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      dispatch(displayErrorNotification(exception.response.data.error));
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogappUser");

    setUser(null);

    dispatch(displayInfoNotification("you have logged out"));
  };

  const createNewBlog = async (newBlog) => {
    dispatch(createBlog(newBlog));
    blogFormToggleRef.current.toggleVisibility();
  };

  const incrementBlogLikes = async (blogToUpdate) => {
    try {
      blogToUpdate.likes += 1;

      const updatedBlog = await blogService.update(
        blogToUpdate.id,
        blogToUpdate
      );
      setBlogs(
        blogs.map((blog) => (updatedBlog.id !== blog.id ? blog : updatedBlog))
      );
    } catch (exception) {
      dispatch(displayErrorNotification(exception.response.data.error));
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (exception) {
      dispatch(displayErrorNotification(exception.response.data.error));
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null && <LoginForm handleLogin={handleLogin} />}
      {user !== null && (
        <>
          <LoginDetails user={user} handleLogout={() => handleLogout()} />
          <Togglable buttonLabel="new note" ref={blogFormToggleRef}>
            <BlogForm createBlog={createNewBlog} />
          </Togglable>
          <Blogs
            incrementBlogLikes={incrementBlogLikes}
            deleteBlog={deleteBlog}
            loggedInUser={user}
          />
        </>
      )}
    </div>
  );
}

export default App;

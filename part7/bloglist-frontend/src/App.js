import React, { useState, useEffect } from "react";

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
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";

function App() {
  const dispatch = useDispatch();

  const newNoteToggleId = "NEW_NOTE";

  const [user, setUser] = useState(null);

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

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null && <LoginForm handleLogin={handleLogin} />}
      {user !== null && (
        <>
          <LoginDetails user={user} handleLogout={() => handleLogout()} />
          <Togglable id={newNoteToggleId} buttonLabel="new note">
            <BlogForm toggleId={newNoteToggleId} />
          </Togglable>
          <Blogs loggedInUser={user} />
        </>
      )}
    </div>
  );
}

export default App;

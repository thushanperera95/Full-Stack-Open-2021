import React, { useEffect } from "react";
import { Routes, Route, Link, useMatch, Navigate } from "react-router-dom";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import LoginDetails from "./components/LoginDetails";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import { useDispatch, useSelector } from "react-redux";
import { initializeSession } from "./reducers/authReducer";
import { LABEL_NEW_NOTE, TOGGLE_ID_NEW_NOTE } from "./utils/constants";
import UserDetails from "./components/UserDetails";
import { initializeUsers } from "./reducers/userReducer";

function App() {
  const dispatch = useDispatch();
  const authenticatedUser = JSON.parse(
    localStorage.getItem("loggedBlogappUser")
  );

  useEffect(() => {
    dispatch(initializeSession());
    dispatch(initializeUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const userMatch = useMatch("/users/:id");
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification />
        {<LoginDetails />}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            authenticatedUser ? (
              <div>
                <Togglable id={TOGGLE_ID_NEW_NOTE} buttonLabel={LABEL_NEW_NOTE}>
                  <BlogForm />
                </Togglable>
                <Blogs />
              </div>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/users/:id"
          element={
            authenticatedUser ? (
              <UserDetails user={user} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/users"
          element={
            authenticatedUser ? <Users /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            authenticatedUser ? <Navigate replace to="/" /> : <LoginForm />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

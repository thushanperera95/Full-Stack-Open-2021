import React, { useEffect } from "react";
import { Routes, Route, Link, useMatch, Navigate } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import LoginDetails from "./components/LoginDetails";
import Notification from "./components/Notification";
import Users from "./components/Users";
import { useDispatch, useSelector } from "react-redux";
import { initializeSession } from "./reducers/authReducer";
import UserDetails from "./components/UserDetails";
import { initializeUsers } from "./reducers/userReducer";
import BlogDetails from "./components/BlogDetails";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector((state) => state.authenticatedUser);

  useEffect(() => {
    dispatch(initializeSession());
    dispatch(initializeUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const userMatch = useMatch("/users/:id");
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogs = useSelector((state) => state.blogs);
  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const backgroundColor = {
    backgroundColor: "lightgrey",
  };

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <div style={backgroundColor}>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <LoginDetails />
      </div>

      <div>
        <h2>blog app</h2>
        <Notification />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            authenticatedUser ? <Home /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/blogs/:id"
          element={
            authenticatedUser && blog ? (
              <BlogDetails blog={blog} />
            ) : (
              <Navigate replace to="/" />
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

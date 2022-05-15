import React, { useEffect } from "react";
import { Routes, Route, Link, useMatch, Navigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import LoginForm from "./components/login/LoginForm";
import LoginDetails from "./components/login/LoginDetails";
import Notification from "./components/Notification";
import Users from "./components/users/Users";
import { useDispatch, useSelector } from "react-redux";
import { initializeSession } from "./reducers/authReducer";
import UserDetails from "./components/users/UserDetails";
import { initializeUsers } from "./reducers/userReducer";
import BlogDetails from "./components/blogs/BlogDetails";
import Home from "./components/Home";
import { AppBar, Toolbar, Button } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";

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

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Blog App</Typography>
          <Button id="button-nav-blogs" color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button
            id="button-nav-users"
            color="inherit"
            component={Link}
            to="/users"
          >
            users
          </Button>
          <LoginDetails />
        </Toolbar>
      </AppBar>

      <div>
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
    </Container>
  );
}

export default App;

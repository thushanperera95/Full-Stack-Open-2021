import React, { useEffect } from "react";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import LoginDetails from "./components/LoginDetails";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeSession } from "./reducers/sessionReducer";
import { LABEL_NEW_NOTE, TOGGLE_ID_NEW_NOTE } from "./utils/constants";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(initializeSession());
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null && <LoginForm />}
      {user !== null && (
        <>
          <LoginDetails />
          <Togglable id={TOGGLE_ID_NEW_NOTE} buttonLabel={LABEL_NEW_NOTE}>
            <BlogForm />
          </Togglable>
          <Blogs />
        </>
      )}
    </div>
  );
}

export default App;

import { React, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const authenticatedUser = useSelector((state) => state.authenticatedUser);

  const [show, setShow] = useState(false);
  const buttonText = show ? "Hide" : "Show";

  const showDeleteButton =
    blog.user && authenticatedUser.username === blog.user.username;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  return (
    <div style={blogStyle}>
      <div className="blogOverview">
        {blog.title} {blog.author}{" "}
        <button onClick={() => setShow(!show)}>{buttonText}</button>
      </div>
      {show && (
        <div className="blogDetails">
          {blog.url}
          <br />
          likes {blog.likes}{" "}
          <button onClick={() => dispatch(likeBlog(blog))}>like</button>
          <br />
          {blog.user && blog.user.name}
          {showDeleteButton && (
            <>
              <br />
              <button
                onClick={handleDelete}
                style={{ background: "lightblue" }}
              >
                remove
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;

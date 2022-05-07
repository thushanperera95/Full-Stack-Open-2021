import React from "react";
import Blog from "./Blog";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Blogs = ({ loggedInUser }) => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      {[...blogs]
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} loggedInUser={loggedInUser} />
        ))}
    </>
  );
};

Blogs.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
};

export default Blogs;

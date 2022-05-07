import { React, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { hideToggle } from "../reducers/toggleReducer";
import { useField } from "../hooks";

const BlogForm = ({ toggleId }) => {
  const dispatch = useDispatch();

  const title = useField("text", "title");
  const author = useField("text", "author");
  const url = useField("text", "url");

  const handleCreateBlog = (event) => {
    event.preventDefault();

    dispatch(
      createBlog({
        title: title.props.value,
        author: author.props.value,
        url: url.props.value,
      })
    );

    dispatch(hideToggle(toggleId));

    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input {...title.props} required />
        </div>
        <div>
          author:
          <input {...author.props} required />
        </div>
        <div>
          url:
          <input {...url.props} required />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  toggleId: PropTypes.string.isRequired,
};

export default BlogForm;

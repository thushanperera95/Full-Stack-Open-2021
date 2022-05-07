import { React, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { hideToggle } from "../reducers/toggleReducer";
import { useField } from "../hooks";

const BlogForm = ({ toggleId }) => {
  const dispatch = useDispatch();

  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

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
          <input {...title.props} name="title" id="input-title" required />
        </div>
        <div>
          author:
          <input {...author.props} name="author" id="input-author" required />
        </div>
        <div>
          url:
          <input {...url.props} name="url" id="input-url" required />
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

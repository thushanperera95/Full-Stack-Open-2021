import { React, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { hideToggle } from "../reducers/toggleReducer";

const BlogForm = ({ toggleId }) => {
  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleCreateBlog = (event) => {
    event.preventDefault();

    dispatch(
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      })
    );

    dispatch(hideToggle(toggleId));

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            name="title"
            id="input-title"
            onChange={({ target }) => setNewTitle(target.value)}
            required
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            name="author"
            id="input-author"
            onChange={({ target }) => setNewAuthor(target.value)}
            required
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            name="url"
            id="input-url"
            onChange={({ target }) => setNewUrl(target.value)}
            required
          />
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

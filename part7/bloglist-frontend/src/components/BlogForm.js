import { React } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { hideToggle } from "../reducers/toggleReducer";
import { useField } from "../hooks";
import { TOGGLE_ID_NEW_NOTE } from "../utils/constants";

const BlogForm = () => {
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

    dispatch(hideToggle(TOGGLE_ID_NEW_NOTE));

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

export default BlogForm;

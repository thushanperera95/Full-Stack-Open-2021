import { React } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../../reducers/blogReducer";
import { hideToggle } from "../../reducers/toggleReducer";
import { useField } from "../../hooks";
import { TOGGLE_ID_NEW_NOTE } from "../../utils/constants";
import { Button, TextField } from "@mui/material";

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
          <TextField margin="dense" label="title" {...title.props} required />
        </div>
        <div>
          <TextField margin="dense" label="author" {...author.props} required />
        </div>
        <div>
          <TextField margin="dense" label="url" {...url.props} required />
        </div>
        <Button variant="contained" color="primary" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;

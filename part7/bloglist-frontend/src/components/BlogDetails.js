import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch();

  const authenticatedUser = useSelector((state) => state.authenticatedUser);
  const showDeleteButton =
    blog.user && authenticatedUser.username === blog.user.username;

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={`//${blog.url}`}>{blog.url}</a>
      <br />
      likes {blog.likes}{" "}
      <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      <br />
      added by {blog.user && blog.user.name}
      {showDeleteButton && (
        <>
          <br />
          <button onClick={handleDelete} style={{ background: "lightblue" }}>
            remove
          </button>
        </>
      )}
    </div>
  );
};

export default BlogDetails;

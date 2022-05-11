import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { addComment } from "../reducers/blogReducer";

const BlogComments = ({ blog }) => {
  const dispatch = useDispatch();
  const comment = useField("text", "comment");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addComment(blog.id, comment.props.value)).then(() => {
      comment.reset();
    });
  };

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input {...comment.props} />
          <button type="submit">add comment</button>
        </div>
      </form>
      <ul>
        {blog.comments.length > 0 &&
          blog.comments.map((comment) => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  );
};

export default BlogComments;

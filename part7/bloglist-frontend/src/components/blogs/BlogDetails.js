import {
  Box,
  Button,
  Card,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useField } from "../../hooks";
import { addComment, deleteBlog, likeBlog } from "../../reducers/blogReducer";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";

const BlogInfo = ({ blog }) => {
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
    <>
      <Link href={`//${blog.url}`}>{blog.url}</Link>
      <Typography>
        Likes {blog.likes}
        <IconButton id="button-like" onClick={() => dispatch(likeBlog(blog))}>
          <ThumbUpIcon />
        </IconButton>
      </Typography>
      <Typography>
        Added by {blog.user && blog.user.name}
        {showDeleteButton && (
          <Box sx={{ my: 1 }}>
            <Button
              id="button-delete"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              delete
            </Button>
          </Box>
        )}
      </Typography>
    </>
  );
};

const BlogComments = ({ blog }) => {
  const dispatch = useDispatch();
  const comment = useField("text", "comment");

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    dispatch(addComment(blog.id, comment.props.value)).then(() => {
      comment.reset();
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <form onSubmit={handleCommentSubmit}>
                  <div>
                    <TextField
                      id="comment"
                      label="Comment"
                      variant="filled"
                      {...comment.props}
                    />
                    <Button
                      id="button-add-comment"
                      variant="outlined"
                      type="submit"
                    >
                      Add
                    </Button>
                  </div>
                </form>
              </TableCell>
            </TableRow>
            {blog.comments.map((comment) => (
              <TableRow key={comment}>
                <TableCell>{comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const BlogDetails = ({ blog }) => {
  return (
    <div>
      <Box id="blog-title" sx={{ m: 1 }}>
        <Typography variant="h4">{blog.title}</Typography>
      </Box>
      <Card id="blog-info">
        <Box sx={{ m: 2 }}>
          <BlogInfo blog={blog} />
        </Box>
      </Card>
      <Card id="blog-comments">
        <Box sx={{ m: 2 }}>
          <BlogComments blog={blog} />
        </Box>
      </Card>
    </div>
  );
};

export default BlogDetails;

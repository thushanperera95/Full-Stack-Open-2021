import { React } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TableCell } from "@mui/material";

const Blog = ({ blog }) => (
  <>
    <TableCell id="blog-title">
      <Link to={`/blogs/${blog.id}`} id="blog-title-link">
        {blog.title}
      </Link>
    </TableCell>
    <TableCell id="blog-author">{blog.author}</TableCell>
  </>
);

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;

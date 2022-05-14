import { React } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TableCell } from "@mui/material";

const Blog = ({ blog }) => (
  <>
    <TableCell>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </TableCell>
    <TableCell>{blog.author}</TableCell>
  </>
);

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;

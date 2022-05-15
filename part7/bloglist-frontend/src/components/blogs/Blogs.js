import React, { useEffect } from "react";
import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../../reducers/blogReducer";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableHead,
  TableCell,
} from "@mui/material";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead id="blogs-header">
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="blogs-body">
          {[...blogs]
            .sort((a, b) => (a.likes > b.likes ? -1 : 1))
            .map((blog) => (
              <TableRow key={blog.id} className="blogs-row">
                <Blog blog={blog} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Blogs;

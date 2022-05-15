import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const UserDetails = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <Box sx={{ m: 1 }}>
        <Typography variant="h4">{user.name}</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead id="user-details-header">
            <TableRow>
              <TableCell>Added Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="user-details-blogs">
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserDetails;

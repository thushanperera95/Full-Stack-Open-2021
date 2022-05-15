import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableHead,
  TableCell,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import User from "./User";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <Box sx={{ m: 1 }}>
        <Typography variant="h4">Users</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead id="users-header">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="users-body">
            {users.map((user) => (
              <TableRow className="users-row" key={user.id}>
                <User
                  id={user.id}
                  name={user.name}
                  numberOfBlogs={user.blogs.length}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;

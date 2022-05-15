import { Link } from "react-router-dom";
import { TableCell } from "@mui/material";

const User = ({ id, name, numberOfBlogs }) => (
  <>
    <TableCell>
      <Link to={`/users/${id}`} id="user-title-link">
        {name}
      </Link>
    </TableCell>
    <TableCell>{numberOfBlogs}</TableCell>
  </>
);

export default User;

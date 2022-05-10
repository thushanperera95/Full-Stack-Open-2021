import { Link } from "react-router-dom";

const UserLine = ({ id, name, numberOfBlogs }) => (
  <tr>
    <Link to={`/users/${id}`}>
      <td>{name}</td>
    </Link>
    <td>{numberOfBlogs}</td>
  </tr>
);

export default UserLine;

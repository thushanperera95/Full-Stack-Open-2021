import { Link } from "react-router-dom";

const UserLine = ({ id, name, numberOfBlogs }) => (
  <tr>
    <td>
      <Link to={`/users/${id}`}>{name}</Link>
    </td>
    <td>{numberOfBlogs}</td>
  </tr>
);

export default UserLine;

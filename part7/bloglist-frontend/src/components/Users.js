import { useSelector } from "react-redux";
import UserLine from "./UserLine";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
          {users.map((user) => (
            <UserLine
              key={user.id}
              name={user.name}
              numberOfBlogs={user.blogs.length}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

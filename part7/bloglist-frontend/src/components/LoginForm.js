import { React } from "react";
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { login } from "../reducers/sessionReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const username = useField("text", "username");
  const password = useField("password", "password");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      login({
        username: username.props.value,
        password: password.props.value,
      })
    );

    username.reset();
    password.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input {...username.props} required />
      </div>
      <div>
        password
        <input {...password.props} required />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;

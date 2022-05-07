import { React } from "react";
import PropTypes from "prop-types";
import { useField } from "../hooks";

const LoginForm = ({ handleLogin }) => {
  const username = useField("text");
  const password = useField("password");

  const handleSubmit = (event) => {
    event.preventDefault();

    handleLogin({
      username: username.props.value,
      password: password.props.value,
    });

    username.reset();
    password.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input {...username.props} name="Username" required />
      </div>
      <div>
        password
        <input {...password.props} name="Password" required />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;

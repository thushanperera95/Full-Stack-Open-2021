import { React } from "react";
import { useField } from "../../hooks";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useField("text", "username");
  const password = useField("password", "password");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      login({
        username: username.props.value,
        password: password.props.value,
      })
    ).then(() => {
      username.reset();
      password.reset();
      navigate("/");
    });
  };

  return (
    <Box sx={{ m: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ my: 2 }}>
          <TextField label="username" {...username.props} required />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField label="password" {...password.props} required />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;

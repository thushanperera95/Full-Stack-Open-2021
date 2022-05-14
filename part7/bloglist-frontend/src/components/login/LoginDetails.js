import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/authReducer";
import { Button, Typography } from "@mui/material";

const LoginDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authenticatedUser = useSelector((state) => state.authenticatedUser);
  if (!authenticatedUser) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <Typography fontStyle="italic">
        {authenticatedUser.name} logged in
      </Typography>
      <Button color="inherit" onClick={handleLogout}>
        logout
      </Button>
    </>
  );
};

export default LoginDetails;

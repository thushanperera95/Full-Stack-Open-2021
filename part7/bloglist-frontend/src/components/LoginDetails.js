import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducers/authReducer";

const LoginDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authenticatedUser = useSelector((state) => state.authenticatedUser);
  if (!authenticatedUser) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <p>
      {authenticatedUser.name} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
  );
};

export default LoginDetails;

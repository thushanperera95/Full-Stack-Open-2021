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
    dispatch(logout()).then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      {authenticatedUser.name} logged in{" "}
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default LoginDetails;

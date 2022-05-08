import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authReducer";

const LoginDetails = () => {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector((state) => state.authenticatedUser);

  return (
    <p>
      {authenticatedUser.name} logged in
      <button onClick={() => dispatch(logout())}>logout</button>
    </p>
  );
};

export default LoginDetails;

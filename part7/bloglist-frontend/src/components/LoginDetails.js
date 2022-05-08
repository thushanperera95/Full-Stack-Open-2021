import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/sessionReducer";

const LoginDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);

  return (
    <p>
      {user.name} logged in
      <button onClick={() => dispatch(logout())}>logout</button>
    </p>
  );
};

export default LoginDetails;

import React from 'react'

const LoginDetails = ({ user, handleLogout }) => (
  <p>
    {user.name} logged in
    <button onClick={() => handleLogout()}>logout</button>
  </p>
)

export default LoginDetails
import React from 'react'

const LoginForm = ({ usernameState, passwordState, handleLogin }) => (
  <form onSubmit={handleLogin}>
    <div>
        username
      <input
        type="text"
        value={usernameState.username}
        name="Username"
        onChange={({ target }) => usernameState.setUsername(target.value)}
      />
    </div>
    <div>
        password
      <input
        type="password"
        value={passwordState.password}
        name="Password"
        onChange={({ target }) => passwordState.setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
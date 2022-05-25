import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { CURRENT_USER, LOGIN } from "../queries";

const LoginForm = ({ show, setToken, setPage, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    refetchQueries: [
      {
        query: CURRENT_USER,
        onError: (error) => {
          setError(error.graphQLErrors[0].message);
        },
      },
    ],
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });

    setUsername("");
    setPassword("");

    setPage("authors");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            type="text"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;

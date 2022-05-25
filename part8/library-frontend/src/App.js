import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import Recommend from "./components/Recommend";
import SetBirthYear from "./components/SetBirthYear";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    setToken(localStorage.getItem("library-user-token"));
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} setError={notify} />
      {token && <SetBirthYear show={page === "authors"} setError={notify} />}

      <Books show={page === "books"} setError={notify} />

      {token && (
        <>
          <NewBook show={page === "add"} setError={notify} />
          <Recommend show={page === "recommend"} setError={notify} />
        </>
      )}

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
        setError={notify}
      />
    </div>
  );
};

export default App;

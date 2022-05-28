import { useApolloClient, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import Recommend from "./components/Recommend";
import SetBirthYear from "./components/SetBirthYear";
import { ALL_AUTHORS, ALL_BOOKS, AUTHOR_ADDED, BOOK_ADDED } from "./queries";

export const updateBookCache = (cache, newBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(newBook)),
    };
  });
};

export const updateAuthorCache = (cache, newAuthor) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
    return {
      allAuthors: uniqByName(allAuthors.concat(newAuthor)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    setToken(localStorage.getItem("library-user-token"));
  }, []);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} by ${addedBook.author.name} added`);

      updateBookCache(client.cache, addedBook);
    },
  });

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedAuthor = subscriptionData.data.authorAdded;

      updateAuthorCache(client.cache, addedAuthor);
    },
  });

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

import { useQuery } from "@apollo/client";
import { useState } from "react";
import { BOOKS_BY_GENRE, CURRENT_USER } from "../queries";
import BooksTable from "./BooksTable";

const Recommend = ({ show, setError }) => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  const currentUserResult = useQuery(CURRENT_USER, {
    onCompleted: (data) => setUser(data.me),
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const booksByGenreResult = useQuery(BOOKS_BY_GENRE, {
    variables: {
      genre: user?.favouriteGenre ? user.favouriteGenre : "",
    },
    onCompleted: (data) => {
      setBooks(data.allBooks);
    },
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  if (!show) {
    return null;
  }

  if (currentUserResult.loading || !user || booksByGenreResult.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favourite genre {user.favouriteGenre}</p>
      {books.length === 0 && (
        <p>Could not find any books matching favourite genre</p>
      )}
      {books.length > 0 && <BooksTable books={books} />}
    </div>
  );
};

export default Recommend;

import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";
import BooksTable from "./BooksTable";

const Books = ({ show, setError }) => {
  const [filterGenre, setFilterGenre] = useState("all");
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);

  const [getBooksByGenre, booksByGenreResult] = useLazyQuery(BOOKS_BY_GENRE, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const allBooksResult = useQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setGenres([...new Set(data.allBooks.flatMap((b) => b.genres).sort())]);
      setBooks(data.allBooks);
    },
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    getBooksByGenre({
      variables: {
        genre: filterGenre === "all" ? "" : filterGenre,
      },
      onCompleted: (data) => {
        setBooks(data.allBooks);
      },
      fetchPolicy: "network-only",
    });
  }, [filterGenre, getBooksByGenre]);

  if (!show) {
    return null;
  }

  if (booksByGenreResult.loading || allBooksResult.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      <BooksTable books={books} />
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilterGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilterGenre("all")}>all</button>
    </div>
  );
};

export default Books;

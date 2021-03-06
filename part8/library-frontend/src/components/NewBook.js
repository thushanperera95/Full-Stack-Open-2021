import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { updateBookCache } from "../App";
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  BOOKS_BY_GENRE,
  CREATE_BOOK,
  CURRENT_USER,
} from "../queries";

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [user, setUser] = useState(null);

  const currentUserResult = useQuery(CURRENT_USER, {
    onCompleted: (data) => setUser(data.me),
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      {
        query: ALL_AUTHORS,
        onError: (error) => {
          setError(error.graphQLErrors[0].message);
        },
      },
      {
        query: ALL_BOOKS,
        onError: (error) => {
          setError(error.graphQLErrors[0].message);
        },
      },
      {
        query: BOOKS_BY_GENRE,
        variables: { genre: user ? user.favouriteGenre : "" },
        onError: (error) => {
          setError(error.graphQLErrors[0].message);
        },
      },
    ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    update: (cache, response) => {
      updateBookCache(cache, response.data.addBook);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    const publishedYear = parseInt(published);

    createBook({ variables: { title, author, publishedYear, genres } });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  if (!show || currentUserResult.loading) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

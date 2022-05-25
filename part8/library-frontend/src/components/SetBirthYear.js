import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, SET_AUTHOR_BIRTH_YEAR } from "../queries";

const SetBirthYear = ({ show, setError }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [setAuthorBirthYear] = useMutation(SET_AUTHOR_BIRTH_YEAR, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const author = allAuthors.find(
          (a) => a.name === response.data.editAuthor.name
        );

        const updatedAuthor = {
          ...author,
          born: response.data.editAuthor.born,
        };

        return {
          allAuthors: allAuthors.map((a) =>
            a.name === response.data.editAuthor.name ? updatedAuthor : a
          ),
        };
      });
    },
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const authorsQueryResult = useQuery(ALL_AUTHORS);

  const submit = async (event) => {
    event.preventDefault();

    var bornYear = parseInt(born);
    setAuthorBirthYear({ variables: { name, setBornTo: bornYear } });

    setName("");
    setBorn("");
  };

  if (authorsQueryResult.loading || !show) {
    return null;
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select
            defaultValue=""
            onChange={({ target }) => setName(target.value)}
          >
            <option value="" disabled hidden>
              Select Author
            </option>
            {authorsQueryResult.data.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthYear;

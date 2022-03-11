import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const updatePerson = (existingPerson) => {
    const updateMessage = `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`;

    if (window.confirm(updateMessage)) {
      const updatedPerson = { ...existingPerson, number: newNumber };

      personService
        .update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== updatedPerson.id ? person : returnedPerson
            )
          );

          setNewName("");
          setNewNumber("");
        });
    }
  };

  const createPerson = (newPerson) => {
    personService.create(newPerson).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const deleteMessage = `Delete ${personToDelete.name} ?`;

    if (window.confirm(deleteMessage)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  const onAddPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson) {
      updatePerson(existingPerson);
    } else {
      createPerson(newPerson);
    }
  };

  const personsToShow =
    filterText.length == 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().startsWith(filterText.toLowerCase())
        );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterText={filterText} onFilterChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        onFormSubmit={onAddPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} handleDeletePerson={deletePerson} />
    </div>
  );
};

export default App;

import React from 'react'

const Person = ({ name, number, handleDeletePerson }) => (
  <p>
    {name} {number}
    <button onClick={handleDeletePerson}>delete</button>
  </p>
)

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <div>
      {persons?.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          handleDeletePerson={() => handleDeletePerson(person.id)}
        />
      ))}
    </div>
  )
}

export default Persons

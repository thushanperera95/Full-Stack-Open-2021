import React from 'react';

const Person = ({ name, number }) => (
  <p>{name} {number}</p>
)

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

export default Persons;
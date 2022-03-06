import React from 'react';

const PersonForm = ({ onFormSubmit, nameValue, onNameChange, numberValue, onNumberChange }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        name: <input value={nameValue} onChange={onNameChange} required />
      </div>
      <div>
        number: <input type='tel' value={numberValue} onChange={onNumberChange} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;
import React from 'react';

const Filter = ({ filterText, onFilterChange }) => {
  return (
    <div>
      find countries <input value={filterText} onChange={onFilterChange} />
    </div>
  )
}

export default Filter;
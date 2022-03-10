import React from 'react';
import Country from './Country';
import CountryDetails from './CountryDetails';

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]} />
    )
  }
  else if (countries.length > 0 && countries.length <= 10) {
    return (
      <div>
        {countries.map(country =>
          <Country key={country.name.official} country={country} />
        )}
      </div>
    )
  }
  else {
    return null
  }
}

export default Countries;
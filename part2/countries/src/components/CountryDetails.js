import React from 'react';
import Weather from './Weather';

const CountryDetails = ({ country }) => (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
            {
                Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)
            }
        </ul>
        <img src={country.flags.png} alt="Country Flag" />
        <Weather targetCity={country.capital[0]} />
    </div>
)

export default CountryDetails;
import { React, useState } from 'react';
import CountryDetails from './CountryDetails';

const Country = function ({ country }) {
    const [show, setShow] = useState(false)

    return (
        <div>
            <p>{country.name.common}
                <button onClick={() => setShow(!show)}>Show</button>
            </p>
            {show ? <CountryDetails country={country} /> : null}
        </div>
    );
}

export default Country;
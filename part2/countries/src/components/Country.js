import { React, useState } from "react";
import CountryDetail from "./CountryDetail";

const Country = function ({ country }) {
  const [show, setShow] = useState(false);
  const buttonText = show ? "Hide" : "Show";

  return (
    <div>
      <p>
        {country.name.common}
        <button onClick={() => setShow(!show)}>{buttonText}</button>
      </p>
      {show ? <CountryDetail country={country} /> : null}
    </div>
  );
};

export default Country;

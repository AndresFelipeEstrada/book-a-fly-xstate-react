import PropTypes from "prop-types";
import { useState } from "react";
import "./Search.css";

export const Search = ({ state, send }) => {
  const [flight, setFlight] = useState("");

  const goToPassengers = () => {
    send({ type: "CONTINUE", selectedCountry: flight });
  };

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const { countries } = state.context;

  return (
    <div className="container Search">
      <p className="container-title title">Busca tu destino</p>
      <select
        id="country"
        className="Search-select"
        value={flight}
        onChange={handleSelectChange}
      >
        <option value="" disabled defaultValue>
          Escoge un país
        </option>
        {countries.map((country) => (
          <option value={country.name.common} key={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>
      <button
        onClick={goToPassengers}
        disabled={flight === ""}
        className="Search-continue button"
      >
        Continuar
      </button>
    </div>
  );
};

Search.propTypes = {
  send: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

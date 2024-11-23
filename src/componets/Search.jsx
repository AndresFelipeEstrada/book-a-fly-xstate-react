import PropTypes from "prop-types";
import { useState } from "react";
import "./Search.css";

export const Search = ({ send }) => {
  const [flight, setFlight] = useState("");

  const goToPassengers = () => {
    send({ type: "CONTINUE", selectedCountry: flight });
  };

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const options = ["Mexico", "Venezuela", "Colombia"];

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
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
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
};

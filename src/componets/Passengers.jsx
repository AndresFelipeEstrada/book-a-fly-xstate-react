import PropTypes from "prop-types";
import { useState } from "react";
import "./Passengers.css";

export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState("");

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  };

  const goToTicket = () => {
    send({ type: "DONE" });
  };

  const submit = (e) => {
    e.preventDefault();
    const newPassenger = { id: window.crypto.randomUUID(), name: value };
    send({ type: "ADD", newPassenger });
    changeValue("");
  };

  const { passengers } = state.context;

  return (
    <form onSubmit={submit} className="container Passengers">
      <p className="container-title title">
        Agrega a las personas que van a volar ✈️
      </p>
      {passengers.map((person, id) => (
        <p className="text" key={id}>
          {person.name}
        </p>
      ))}
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Escribe el nombre completo"
        required
        value={value}
        onChange={onChangeInput}
      />
      <div className="Passengers-buttons">
        <button className="Passengers-add button-secondary" type="submit">
          Agregar Pasajero
        </button>
        <button
          className="Passenger-pay button"
          type="button"
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};

Passengers.propTypes = {
  send: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

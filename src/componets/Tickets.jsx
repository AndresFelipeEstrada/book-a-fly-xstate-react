import PropTypes from "prop-types";
import "./Tickets.css";

export const Tickets = ({ send, state }) => {
  const finish = () => {
    send({ type: "FINISH" });
  };

  const { passengers, selectedCountry } = state.context;

  return (
    <div className="container">
      <p className="container-title title">
        Gracias por volar con book a fly 💚
      </p>
      {passengers.map((user) => (
        <div key={user.id} className="Tickets-ticket">
          <div className="Tickets-country">{selectedCountry}</div>
          <div className="Tickets-passengers">
            <p>{user.name}</p>
            <span>✈</span>
          </div>
        </div>
      ))}
      <button onClick={finish} className="Tickets-finalizar button">
        Finalizar
      </button>
    </div>
  );
};

Tickets.propTypes = {
  state: PropTypes.object.isRequired,
  send: PropTypes.func.isRequired,
};

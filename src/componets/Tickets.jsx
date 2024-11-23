import PropTypes from "prop-types";
import "./Tickets.css";

export const Tickets = ({ send, context }) => {
  const finish = () => {
    send({ type: "FINISH" });
  };

  const { passengers, selectedCountry } = context;

  return (
    <div className="container">
      <p className="container-title title">
        Gracias por volar con book a fly 💚
      </p>
      <div className="Tickets-ticket">
        <div className="Tickets-country">{selectedCountry}</div>
        <div className="Tickets-passengers">
          <span>✈</span>
          {passengers.map((passenger) => {
            return <p className="user-name" key={passenger.id}>{passenger.name}</p>;
          })}
        </div>
      </div>
      <button onClick={finish} className="Tickets-finalizar button">
        Finalizar
      </button>
    </div>
  );
};

Tickets.propTypes = {
  context: PropTypes.object.isRequired,
  send: PropTypes.func.isRequired,
};

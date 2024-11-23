import PropTypes from "prop-types";
import "./Welcome.css";

export const Welcome = ({ send }) => {

  const startBooking = () => {
    send({ type: "START" });
  };

  return (
    <div className="container">
      <p className="container-title title">¡Hoy es el día!</p>
      <p className="container-description description">
        Compra tu vuelo y conoce un nuevo rincón del mundo, te va a sorprender
        las maravillas que hay para explorar
      </p>
      <button onClick={startBooking} className="Welcome-cancel button">
        Comenzar
      </button>
    </div>
  );
};

Welcome.propTypes = {
  send: PropTypes.func.isRequired,
};

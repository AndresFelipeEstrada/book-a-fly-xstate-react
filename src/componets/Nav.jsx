import PropTypes from "prop-types";
import "./Nav.css";

export const Nav = ({ state, send }) => {

  const goToWelcome = () => {
    send({ type: "cancel" });
  };

  return (
    <nav className="Nav">
      <h1 className="Nav-logo">Book a fly ✈</h1>
      {state.matches("initial") && (
        <button onClick={goToWelcome} className="Nav-cancel button-secondary">
          Cancelar
        </button>
      )}
    </nav>
  );
};

Nav.propTypes = {
  state: PropTypes.object.isRequired,
  send: PropTypes.func.isRequired,
};
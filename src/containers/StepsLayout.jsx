import PropTypes from "prop-types";
import "./StepsLayout.css";

export function StepsLayout({
  onWelcome,
  onPassengers,
  onSearch,
  onTickets,
  state,
  send,
}) {
  return (
    <>
      {state.matches("initial") && onWelcome(send)}
      {state.matches("search") && onSearch(send)}
      {state.matches("passenger") && onPassengers(send)}
      {state.matches("tickets") && onTickets(send)}
    </>
  );
}

StepsLayout.propTypes = {
  children: PropTypes.node,
  onWelcome: PropTypes.func.isRequired,
  onPassengers: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onTickets: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  send: PropTypes.func.isRequired,
};


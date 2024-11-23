import { useMachine } from "@xstate/react";
import { bookingMachine } from "../machines/bookingMachine";
import { StepsLayout } from "./StepsLayout";
import { Nav } from "../componets/Nav";
import { Welcome } from "../componets/Welcome";
import { Search } from "../componets/Search.jsx";
import { Passengers } from "../componets/Passengers.jsx";
import { Tickets } from "../componets/Tickets.jsx";

export default function BaseLayout() {
  const [state, send] = useMachine(bookingMachine);

  // console.log(state.context.selectedCountry);
  // console.log(state);
  return (
    <section className="BaseLayout">
      <Nav state={state} send={send} />
      <StepsLayout
        send={send}
        state={state}
        onWelcome={(send) => <Welcome send={send} />}
        onSearch={(send) => <Search state={state} send={send} />}
        onPassengers={(send) => <Passengers state={state} send={send} />}
        onTickets={(send) => <Tickets context={state.context} send={send} />}
      />
    </section>
  );
}

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

  console.log(state.value);
  return (
    <section className="BaseLayout">
      <Nav state={state} send={send} />
      <StepsLayout
        send={send}
        state={state}
        onWelcome={(send) => <Welcome send={send} />}
        onSearch={(send) => <Search send={send} />}
        onPassengers={(send) => <Passengers send={send} />}
        onTickets={(send) => <Tickets send={send} />}
      />
    </section>
  );
}
import { assign, createMachine, fromPromise } from "xstate";
import { fetchCountries } from "../utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "getCountries",
        src: fromPromise(() => fetchCountries()),
        onDone: {
          target: "success",
          actions: assign({ countries: ({ event }) => event.output }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: "Fallo el request",
          }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

export const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: "",
      countries: [],
      error: "",
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
          },
        },
        entry: assign({
          passengers: ({ context }) => (context.passengers = []),
          selectedCountry: ({ context }) => (context.selectedCountry = ""),
        }),
      },
      search: {
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: ({ event }) => event.selectedCountry,
            }),
          },
          CANCEL: "initial",
        },
        ...fillCountries,
      },
      passengers: {
        on: {
          DONE: {
            target: "tickets",
            guard: "moreThanOnePassenger",
          },
          CANCEL: {
            target: "initial",
            actions: "cleanContext",
          },
          ADD: {
            target: "passengers",
            actions: assign({
              passengers: ({ event, context }) => [
                ...context.passengers,
                event.newPassenger,
              ],
            }),
          },
        },
      },
      tickets: {
        // after: {
        //   5000: {
        //     target: "initial",
        //     actions: "cleanContext",
        //   },
        // },
        on: {
          FINISH: "initial",
        },
      },
    },
  },
  {
    actions: {
      cleanContext: assign({
        selectedCountry: "",
        passengers: [],
      }),
    },
    guards: {
      moreThanOnePassenger: ({ context }) => {
        return context.passengers.length > 0;
      },
    },
  },
);

import { assign, createMachine } from "xstate";
import { fetchCountries } from "../utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "getCountries",
        src: () => fetchCountries,
        onDone: {
          target: "success",
          actions: assign({ countries: ({ event }) => event.data }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: "Fallo el request",
          }),
        },
      },
      success: {},
      failure: {
        on: {
          RETRY: { target: "loading" },
        },
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
        entry: assign({
          passengers: ({ context }) => (context.passengers = []),
          selectedCountry: ({ context }) => (context.selectedCountry = ""),
        }),
        on: {
          START: {
            target: "search.loading",
          },
        },
      },
      search: {
        initial:'loading',
        states: fillCountries,
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: ({ event }) => event.selectedCountry,
            }),
          },
          CANCEL: "initial",
        },
      },
      passengers: {
        on: {
          DONE: "tickets",
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
        on: {
          FINISH: "initial",
          CANCEL: "initial",
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
  },
);

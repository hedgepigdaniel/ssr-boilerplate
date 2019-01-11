import { FIND_STOCKS } from "./actions";
import { findStocks } from "./thunks/findStocks";

export const routes = {
  [FIND_STOCKS]: {
    path: "/",
    thunk: findStocks,
  },
};

import { FIND_STOCKS, LOG_IN, CONFIRM_API_KEY, LOG_OUT } from "./actions";
import { findStocks } from "./thunks/findStocks";
import { confirmApiKey, logOut } from "./thunks/apiKey";

export const routes = {
  [LOG_IN]: {
    path: "/login",
  },
  [CONFIRM_API_KEY]: {
    thunk: confirmApiKey,
  },
  [LOG_OUT]: {
    thunk: logOut,
  },
  [FIND_STOCKS]: {
    path: "/",
    thunk: findStocks,
  },
};

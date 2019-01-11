import {
  FIND_STOCKS,
  LOG_IN,
  CONFIRM_API_KEY,
  LOG_OUT,
  READ_COOKIES,
} from "./actions";
import { findStocks } from "./thunks/findStocks";
import { confirmApiKey, logOut } from "./thunks/apiKey";
import { requiresLogin } from "./thunks/login";
import { readCookies } from "./thunks/cookies";

export const routes = {
  [READ_COOKIES]: {
    thunk: readCookies,
  },
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
    thunk: requiresLogin(findStocks),
  },
};

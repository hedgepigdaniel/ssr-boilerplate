import {
  FIND_STOCKS,
  LOG_IN,
  CONFIRM_API_KEY,
  LOG_OUT,
  READ_COOKIES,
  DASHBOARD,
  TRADE_STOCK,
} from "./actions";
import { findStocks } from "./thunks/findStocks";
import { confirmApiKey, logOut } from "./thunks/apiKey";
import { requiresLogin, loginRedirect } from "./thunks/login";
import { readCookies } from "./thunks/cookies";

export const routes = {
  [READ_COOKIES]: {
    thunk: readCookies,
  },
  [LOG_IN]: {
    path: "/login",
    thunk: loginRedirect,
  },
  [CONFIRM_API_KEY]: {
    thunk: confirmApiKey,
  },
  [LOG_OUT]: {
    thunk: logOut,
  },
  [DASHBOARD]: {
    path: "/",
    thunk: requiresLogin(),
  },
  [FIND_STOCKS]: {
    path: "/find",
    thunk: requiresLogin(findStocks),
  },
  [TRADE_STOCK]: {
    path: "/trade/:symbol/:action",
    thunk: requiresLogin(),
  },
};

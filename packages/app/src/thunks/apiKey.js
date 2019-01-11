import { urlToAction } from "@respond-framework/rudy";

import { selectDraftApiKey } from "../selectors/loginPage";
import { COMMIT_API_KEY } from "../actions";
import { selectPostLoginRedirectUrl } from "../selectors/location";

export const SESSION_COOKIE_NAME = "qwilr/alphavantage";

export const confirmApiKey = (req) => {
  const { dispatch, getState, cookies } = req;
  const state = getState();
  const apiKey = selectDraftApiKey(state);
  cookies.set(SESSION_COOKIE_NAME, apiKey, {
    path: "/",
  });
  dispatch({
    type: COMMIT_API_KEY,
    apiKey,
  });
  const redirectUrl = selectPostLoginRedirectUrl(state);
  dispatch(urlToAction(req, redirectUrl));
};

export const logOut = ({ cookies }) => {
  cookies.remove(SESSION_COOKIE_NAME, {
    path: "/",
  });
};

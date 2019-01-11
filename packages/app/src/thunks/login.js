import { actionToUrl, urlToAction, redirect } from "@respond-framework/rudy";
import { selectPostLoginRedirectUrl } from "../selectors/location";

import { selectAlphaVantageApiKey } from "../selectors/alphaVantage";
import { LOG_IN } from "../actions";

export const loginRedirect = (req) => {
  const { dispatch, getState } = req;
  const state = getState();
  const apiKey = selectAlphaVantageApiKey(state);
  const redirectUrl = selectPostLoginRedirectUrl(state);
  console.log("REDIRECT?", apiKey, redirectUrl);
  if (apiKey && redirectUrl) {
    dispatch(redirect(urlToAction(req, redirectUrl)));
  }
};

export const requiresLogin = (next) => (req) => {
  const { getState, dispatch, action } = req;
  const state = getState();
  if (selectAlphaVantageApiKey(state)) {
    return next(req);
  }
  return Promise.resolve(
    dispatch(
      redirect({
        type: LOG_IN,
        query: {
          redirectTo: actionToUrl(action, req).url,
        },
      }),
    ),
  );
};

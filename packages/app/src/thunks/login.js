import { actionToUrl, urlToAction, redirect } from "@respond-framework/rudy";
import { selectPostLoginRedirectUrl } from "../selectors/location";

import { selectAlphaVantageApiKey } from "../selectors/alphaVantage";
import { LOG_IN, DASHBOARD } from "../actions";

export const loginRedirect = (req) => {
  const { dispatch, getState } = req;
  const state = getState();
  const apiKey = selectAlphaVantageApiKey(state);
  const redirectUrl = selectPostLoginRedirectUrl(state);
  if (apiKey) {
    if (redirectUrl) {
      dispatch(redirect(urlToAction(req, redirectUrl)));
    } else {
      dispatch(
        redirect({
          type: DASHBOARD,
        }),
      );
    }
  }
};

export const requiresLogin = (next) => (req) => {
  const { getState, dispatch, action } = req;
  const state = getState();
  if (selectAlphaVantageApiKey(state)) {
    return next && next(req);
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

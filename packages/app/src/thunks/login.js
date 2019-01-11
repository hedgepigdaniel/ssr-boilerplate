import { actionToUrl } from "@respond-framework/rudy";

import { selectAlphaVantageApiKey } from "../selectors/alphaVantage";
import { LOG_IN } from "../actions";

export const requiresLogin = (next) => (req) => {
  const { getState, dispatch, action } = req;
  const state = getState();
  if (selectAlphaVantageApiKey(state)) {
    return next(req);
  }
  return Promise.resolve(
    dispatch({
      type: LOG_IN,
      query: {
        redirectTo: actionToUrl(action, req).url,
      },
    }),
  );
};

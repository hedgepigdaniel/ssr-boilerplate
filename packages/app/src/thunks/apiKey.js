import { selectDraftApiKey } from "../selectors/loginPage";
import { CONFIRM_API_KEY } from "../actions";

const COOKIE_NAME = "qwilr/alphavantage";

export const confirmApiKey = ({ dispatch, getState, cookies }) => {
  const state = getState();
  const apiKey = selectDraftApiKey(state);
  cookies.set(COOKIE_NAME, apiKey, {
    path: "/",
  });
  dispatch({
    type: CONFIRM_API_KEY,
    apiKey,
  });
};

export const logOut = ({ cookies }) => {
  cookies.delete(COOKIE_NAME, {
    path: "/",
  });
};

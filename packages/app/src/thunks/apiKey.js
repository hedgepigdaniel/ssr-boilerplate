import { redirect } from '@respond-framework/rudy';
import { selectDraftApiKey } from '../selectors/loginPage';
import { COMMIT_API_KEY, LOG_IN } from '../actions';
import { loginRedirect } from './login';

export const SESSION_COOKIE_NAME = 'qwilr/alphavantage';

export const confirmApiKey = (req) => {
  const { dispatch, getState, cookies } = req;
  const state = getState();
  const apiKey = selectDraftApiKey(state);
  cookies.set(SESSION_COOKIE_NAME, apiKey, {
    path: '/',
  });
  dispatch({
    type: COMMIT_API_KEY,
    apiKey,
  });
  dispatch(loginRedirect(req));
};

export const logOut = ({ cookies, dispatch }) => {
  cookies.remove(SESSION_COOKIE_NAME, {
    path: '/',
  });
  dispatch(
    redirect({
      type: LOG_IN,
    }),
  );
};

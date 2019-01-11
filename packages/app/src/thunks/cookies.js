import { SESSION_COOKIE_NAME } from "./apiKey";
import { READ_COOKIES_COMPLETE } from "../actions";

export const readCookies = ({ cookies, dispatch }) => () => {
  const apiKey = cookies.get(SESSION_COOKIE_NAME);
  dispatch({
    type: READ_COOKIES_COMPLETE,
    apiKey,
  });
};

import { COMMIT_API_KEY, LOG_OUT, READ_COOKIES_COMPLETE } from "../actions";

export const apiKey = (state = null, action) => {
  switch (action.type) {
    case READ_COOKIES_COMPLETE:
    case COMMIT_API_KEY: {
      return action.apiKey || null;
    }
    case LOG_OUT: {
      return null;
    }
    default: {
      return state;
    }
  }
};

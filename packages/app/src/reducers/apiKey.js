import { COMMIT_API_KEY, LOG_OUT } from "../actions";

export const apiKey = (state = null, action) => {
  switch (action.type) {
    case COMMIT_API_KEY: {
      return action.apiKey;
    }
    case LOG_OUT: {
      return null;
    }
    default: {
      return state;
    }
  }
};

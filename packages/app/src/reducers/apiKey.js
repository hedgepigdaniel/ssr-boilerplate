import { CONFIRM_API_KEY, LOG_OUT } from "../actions";

export const search = (state = null, action) => {
  switch (action.type) {
    case CONFIRM_API_KEY: {
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

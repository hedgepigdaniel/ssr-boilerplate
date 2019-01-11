import { LOG_IN, SET_API_KEY } from "../actions";

export const search = (state = {}, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {};
    }
    case SET_API_KEY: {
      return {
        ...state,
        apiKey: action.apiKey,
      };
    }
    default: {
      return state;
    }
  }
};

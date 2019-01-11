import { LOG_IN, FIND_STOCKS } from "../actions";

export const page = (state = null, action) => {
  switch (action.type) {
    case FIND_STOCKS:
    case LOG_IN: {
      return action.type;
    }
    default: {
      return state;
    }
  }
};

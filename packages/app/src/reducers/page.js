import { LOG_IN, FIND_STOCKS, DASHBOARD } from "../actions";

export const page = (state = null, action) => {
  switch (action.type) {
    case DASHBOARD:
    case FIND_STOCKS:
    case LOG_IN: {
      return action.type;
    }
    default: {
      return state;
    }
  }
};

import { LOG_IN, FIND_STOCKS, DASHBOARD, TRADE_STOCK } from "../actions";

export const page = (state = null, action) => {
  switch (action.type) {
    case DASHBOARD:
    case FIND_STOCKS:
    case TRADE_STOCK:
    case LOG_IN: {
      return action.type;
    }
    default: {
      return state;
    }
  }
};

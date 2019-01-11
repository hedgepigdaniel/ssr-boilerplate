import { SEARCH_STOCKS_SUCCESS } from "../actions";

export const stocks = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_STOCKS_SUCCESS: {
      const { matches } = action;
      return matches.reduce(
        (existingState, match) => {
          const newState = existingState;
          newState[match.symbol] = match;
          return newState;
        },
        { ...state },
      );
    }
    default: {
      return state;
    }
  }
};

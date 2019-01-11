import { SEARCH_STOCKS_SUCCESS } from "../actions";

export const search = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_STOCKS_SUCCESS: {
      const { matches, query } = action;
      return {
        ...state,
        [query]: matches.map((match) => match["1. symbol"]),
      };
    }
    default: {
      return state;
    }
  }
};

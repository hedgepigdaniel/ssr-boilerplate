import { LOG_IN } from "../actions";

export const page = (state = null, action) => {
  switch (action.type) {
    case LOG_IN: {
      return LOG_IN;
    }
    default: {
      return state;
    }
  }
};

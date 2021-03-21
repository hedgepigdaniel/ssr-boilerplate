import { Action } from '../actions';

export type Page = 'HOME' | null;

export const page = (state: Page = null, action: Action): Page => {
  switch (action.type) {
    case 'HOME': {
      return action.type;
    }
    default: {
      return state;
    }
  }
};

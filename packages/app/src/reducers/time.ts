import { Action } from '../actions';

export type Time = {
  interval: ReturnType<typeof setInterval> | null;
  time: number | null;
};

const DEFAULT_STATE: Time = { interval: null, time: null };

export const time = (state: Time = DEFAULT_STATE, action: Action): Time => {
  switch (action.type) {
    case 'TIME_START': {
      return {
        time: action.time,
        interval: action.interval,
      };
    }
    case 'TIME_UPDATE': {
      return {
        ...state,
        time: action.time,
      };
    }
    case 'TIME_END': {
      return DEFAULT_STATE;
    }
    default: {
      return state;
    }
  }
};

import { Store as ReduxStore } from 'redux';
import { Action } from './actions';
import { State } from './state';

export type Store = ReduxStore<State, Action> & {
  dispatch: (action: Action) => Promise<void>;
};

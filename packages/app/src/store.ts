import { Store as ReduxStore } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from './actions';
import { State } from './state';

export type Store = ReduxStore<State, Action> & {
  dispatch: ThunkDispatch<State, undefined, Action>;
};

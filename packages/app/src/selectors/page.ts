import { Page } from '../reducers/page';
import { State } from '../state';

export const selectPage = (state: State): Page => state.page;

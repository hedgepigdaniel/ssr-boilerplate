import { LocationState } from '@respond-framework/rudy';
import { Page } from './reducers/page';

export type State = {
  page: Page;
  location: LocationState;
};

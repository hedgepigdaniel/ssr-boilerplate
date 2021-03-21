import { LocationState } from '@respond-framework/rudy';
import { Page } from './reducers/page';
import { Time } from './reducers/time';

export type State = {
  page: Page;
  time: Time;
  location: LocationState;
};

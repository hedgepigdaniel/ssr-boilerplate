import { createSelector } from "reselect";
import { LOG_IN } from "../actions";

export const selectLocation = (state) => state.location;

export const selectPostLoginRedirectUrl = createSelector(
  [selectLocation],
  (location) => {
    if (location.type === LOG_IN) {
      return location.query.redirectTo || null;
    }
    return null;
  },
);

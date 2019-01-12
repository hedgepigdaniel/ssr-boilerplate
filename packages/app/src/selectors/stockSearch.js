import { createSelector } from "reselect";
import { selectLocation } from "./location";
import { selectMatches } from "./matches";
import { FIND_STOCKS } from "../actions";

export const selectStockSearchQuery = createSelector(
  [selectLocation],
  (location) => {
    if (location.type === FIND_STOCKS) {
      return location.query.search || "";
    }
    return "";
  },
);

/**
 * Get the matches for the search string, or if they are not
 * available, the matches for the longest possible prefix of it
 */
export const selectStockSearchResults = createSelector(
  [selectStockSearchQuery, selectMatches],
  (query, matches) => {
    let subQuery = query || "";
    let closestMatches = [];
    while (subQuery.length > 0) {
      if (matches[subQuery] !== undefined) {
        closestMatches = matches[subQuery];
        break;
      }
      subQuery = subQuery.slice(0, subQuery.length - 1);
    }
    return closestMatches;
  },
);

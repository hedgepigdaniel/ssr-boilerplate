import { connect } from "react-redux";
import { FindStocks } from "./component";
import {
  selectStockSearchQuery,
  selectStockSearchResults,
} from "../../selectors/stockSearch";

export const ConnectedFindStocks = connect((state) => ({
  search: selectStockSearchQuery(state),
  results: selectStockSearchResults(state),
}))(FindStocks);

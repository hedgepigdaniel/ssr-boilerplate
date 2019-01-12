import { connect } from "react-redux";
import { StockSearchResult } from "./component";
import { makeSelectStock } from "../../../selectors/stocks";

export const ConnectedStockSearchResult = connect((firstState, ownProps) => {
  const selectStock = makeSelectStock(ownProps.symbol);
  return (state) => ({
    stock: selectStock(state),
  });
})(StockSearchResult);

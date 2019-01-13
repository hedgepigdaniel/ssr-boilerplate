import { connect } from 'react-redux';

import { TradeStock } from './component';
import { makeSelectHolding } from '../../selectors/stockHoldings';
import { makeSelectStock } from '../../selectors/stocks';
import {
  selectCurrentSymbol,
  selectCurrentTradeAction,
} from '../../selectors/location';
import { makeSelectStockPrice } from '../../selectors/stockPrice';

export const ConnectedTradeStock = connect(() => {
  let lastSymbol;
  let selectHolding;
  let selectStock;
  let selectPrice;
  return (state) => {
    const symbol = selectCurrentSymbol(state);
    const action = selectCurrentTradeAction(state);
    if (symbol !== lastSymbol) {
      selectHolding = makeSelectHolding(symbol);
      selectStock = makeSelectStock(symbol);
      selectPrice = makeSelectStockPrice(symbol);
    }
    return {
      holding: selectHolding(state),
      stock: selectStock(state),
      price: selectPrice(state),
      action,
    };
  };
})(TradeStock);

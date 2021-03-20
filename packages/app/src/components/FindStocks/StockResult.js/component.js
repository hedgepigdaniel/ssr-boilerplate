/** @jsx jsx */
import { jsx } from '@emotion/react';
import { TRADE_STOCK } from '../../../actions';

export const StockSearchResult = ({ stock, dispatch }) => (
  <li>
    {stock.name} ({stock.symbol})
    <button
      type="button"
      onClick={() =>
        dispatch({
          type: TRADE_STOCK,
          params: {
            symbol: stock.symbol,
            action: 'buy',
          },
        })
      }
    >
      Buy
    </button>
  </li>
);

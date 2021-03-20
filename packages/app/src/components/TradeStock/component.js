/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/react';

export const TradeStock = ({ stock, action, price }) => (
  <Fragment>
    <h1>
      {stock.symbol}: {stock.name}
    </h1>
    <h2>
      {action === 'buy' ? 'Buy' : 'Sell'} (${price || '--'})
    </h2>
    Amount:
  </Fragment>
);

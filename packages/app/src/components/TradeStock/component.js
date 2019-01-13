/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';

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

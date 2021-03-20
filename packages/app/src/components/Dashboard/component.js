/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/react';
import {
  DEPOSIT_CASH,
  WITHDRAW_CASH,
  FIND_STOCKS,
  TRADE_STOCK,
} from '../../actions';

export const Dashboard = ({ dispatch, holdings = [] }) => (
  <Fragment>
    <h1>Dashboard</h1>
    <div>
      <h2>Cash</h2>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: DEPOSIT_CASH,
          })
        }
      >
        Deposit
      </button>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: WITHDRAW_CASH,
          })
        }
      >
        Withdraw
      </button>
    </div>
    <div>
      <h2>Stocks</h2>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: FIND_STOCKS,
          })
        }
      >
        Buy new stocks
      </button>
      <ul>
        {holdings.map((holding) => (
          <li>
            {holding.company}({holding.symbol}) - {holding.amount} (
            {holding.amount * holding.value}USD)
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: TRADE_STOCK,
                  params: {
                    symbol: holding.symbol,
                    action: 'buy',
                  },
                })
              }
            >
              Buy more
            </button>
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: TRADE_STOCK,
                  params: {
                    symbol: holding.symbol,
                    action: 'sell',
                  },
                })
              }
            >
              Sell
            </button>
          </li>
        ))}
      </ul>
    </div>
  </Fragment>
);

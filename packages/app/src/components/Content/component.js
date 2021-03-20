/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { LOG_IN, DASHBOARD, FIND_STOCKS, TRADE_STOCK } from '../../actions';
import { ConnectedLogin } from '../Login/connector';
import { ConnectedDashboard } from '../Dashboard/connector';
import { ConnectedFindStocks } from '../FindStocks/connector';
import { ConnectedTradeStock } from '../TradeStock/connector';

const ContentSwitch = ({ page }) => {
  switch (page) {
    case LOG_IN: {
      return <ConnectedLogin />;
    }
    case DASHBOARD: {
      return <ConnectedDashboard />;
    }
    case FIND_STOCKS: {
      return <ConnectedFindStocks />;
    }
    case TRADE_STOCK: {
      return <ConnectedTradeStock />;
    }
    default: {
      return <div>Error: unknown page</div>;
    }
  }
};

export const Content = (props) => (
  <div
    css={css`
      grid-area: content;
    `}
  >
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <ContentSwitch {...props} />
  </div>
);

export const TradeStock = ({ stock, action, price }) => (
  <>
    <h1>
      {stock.symbol}: {stock.name}
    </h1>
    <h2>
      {action === 'buy' ? 'Buy' : 'Sell'} (${price || '--'})
    </h2>
    Amount:
  </>
);

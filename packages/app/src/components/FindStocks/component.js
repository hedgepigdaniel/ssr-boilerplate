/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { redirect } from "@respond-framework/rudy";
import { FIND_STOCKS } from "../../actions";
import { ConnectedStockSearchResult } from "./StockResult.js/connector";

export const FindStocks = ({ dispatch, search, results }) => (
  <Fragment>
    <h1>Find Stocks</h1>
    Search:
    <input
      type="text"
      value={search}
      onChange={(event) =>
        dispatch(
          redirect({
            type: FIND_STOCKS,
            query: {
              search: event.currentTarget.value,
            },
          }),
        )
      }
    />
    <ul>
      {results.map((symbol) => (
        <ConnectedStockSearchResult key={symbol} symbol={symbol} />
      ))}
    </ul>
  </Fragment>
);

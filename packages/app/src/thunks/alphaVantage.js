import axios from "axios";
import { selectAlphaVantageApiKey } from "../selectors/alphaVantage";

const ALPHA_VANTAGE_API_ENDPOINT = "https://www.alphavantage.co/query";

export const searchStocks = (search) => async (dispatch, getState) => {
  if (!search) {
    return Promise.resolve();
  }
  const {
    data: { bestMatches: matches },
  } = await axios.get(ALPHA_VANTAGE_API_ENDPOINT, {
    params: {
      function: "SYMBOL_SEARCH",
      keywords: search,
      apikey: selectAlphaVantageApiKey(getState()),
    },
  });
  return matches.map((match) => ({
    symbol: match["1. symbol"],
    name: match["2. name"],
    type: match["3. type"],
    region: match["4. region"],
    marketOpen: match["5. marketOpen"],
    marketClose: match["6. marketClose"],
    timezone: match["7. timezone"],
    currency: match["8. currency"],
    // matchScore: match["9. matchScore"],
  }));
};

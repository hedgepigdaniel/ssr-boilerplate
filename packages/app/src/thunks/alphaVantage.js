import axios from "axios";
import { selectAlphaVantageApiKey } from "../selectors/alphaVantage";

const ALPHA_VANTAGE_API_ENDPOINT = "https://www.alphavantage.co/query";

export const searchStocks = (search) => (dispatch, getState) => {
  if (!search) {
    return Promise.resolve();
  }
  return axios.get(ALPHA_VANTAGE_API_ENDPOINT, {
    params: {
      function: "SYMBOL_SEARCH",
      keywords: search,
      apikey: selectAlphaVantageApiKey(getState()),
    },
  });
};

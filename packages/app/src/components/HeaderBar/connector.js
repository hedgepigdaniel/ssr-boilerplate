import { connect } from "react-redux";

import { HeaderBar } from "./component";
import { selectAlphaVantageApiKey } from "../../selectors/alphaVantage";

export const ConnectedHeaderBar = connect((state) => ({
  apiKey: selectAlphaVantageApiKey(state),
}))(HeaderBar);

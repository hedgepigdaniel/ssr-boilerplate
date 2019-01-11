import { connect } from "react-redux";

import { selectPage } from "../../selectors/page";
import { App } from "./component";

export const ConnectedApp = connect((state) => ({
  page: selectPage(state),
}))(App);

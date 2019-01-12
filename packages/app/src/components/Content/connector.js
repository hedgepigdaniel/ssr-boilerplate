import { connect } from "react-redux";

import { selectPage } from "../../selectors/page";
import { Content } from "./component";

export const ConnectedContent = connect((state) => ({
  page: selectPage(state),
}))(Content);

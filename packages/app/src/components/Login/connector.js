import { connect } from "react-redux";
import { selectDraftApiKey } from "../../selectors/loginPage";
import { Login } from "./component";

export const ConnectedLogin = connect((state) => ({
  draftApiKey: selectDraftApiKey(state),
}))(Login);

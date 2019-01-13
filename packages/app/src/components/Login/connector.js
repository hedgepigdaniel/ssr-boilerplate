import { connect } from 'react-redux';
import { selectDraftApiKey } from '../../selectors/loginPage';
import { Login } from './component';
import { selectAlphaVantageApiKey } from '../../selectors/alphaVantage';

export const ConnectedLogin = connect((state) => ({
  draftApiKey: selectDraftApiKey(state),
  currentApiKey: selectAlphaVantageApiKey(state),
}))(Login);

import React, { Fragment } from 'react';
import { SET_API_KEY, CONFIRM_API_KEY, LOG_OUT } from '../../actions';

export const Login = ({ currentApiKey, draftApiKey, dispatch }) => (
  <Fragment>
    <h1>Log {currentApiKey ? 'out' : 'in'}</h1>
    {currentApiKey ? (
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: LOG_OUT,
          })
        }
      >
        Log out
      </button>
    ) : (
      <Fragment>
        Enter an AlphaVantage{' '}
        <a href="https://www.alphavantage.co/support/#api-key">API key</a>{' '}
        (hint: any string will work)
        <input
          key="type"
          type="text"
          value={draftApiKey}
          onChange={({ currentTarget: { value: apiKey } }) =>
            dispatch({
              type: SET_API_KEY,
              apiKey,
            })
          }
        />
        <button
          key="button"
          type="button"
          onClick={() =>
            dispatch({
              type: CONFIRM_API_KEY,
            })
          }
        >
          Log in
        </button>
      </Fragment>
    )}
  </Fragment>
);

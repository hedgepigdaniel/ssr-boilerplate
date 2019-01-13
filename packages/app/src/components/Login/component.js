import React from 'react';
import { SET_API_KEY, CONFIRM_API_KEY, LOG_OUT } from '../../actions';

export const Login = ({ currentApiKey, draftApiKey, dispatch }) => (
  <div>
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
      [
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
        />,
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
        </button>,
      ]
    )}
  </div>
);

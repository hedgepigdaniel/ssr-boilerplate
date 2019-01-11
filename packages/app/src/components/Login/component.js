import React from "react";
import { SET_API_KEY, CONFIRM_API_KEY } from "../../actions";

export const Login = ({ draftApiKey, dispatch }) => (
  <div>
    <input
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
      type="button"
      onClick={() =>
        dispatch({
          type: CONFIRM_API_KEY,
        })
      }
    />
  </div>
);

import React from "react";
import { LOG_OUT } from "../../actions";

export const HeaderBar = ({ apiKey, dispatch }) => (
  <header>
    {apiKey && (
      <>
        <span>Using key {apiKey}</span>
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
      </>
    )}
  </header>
);

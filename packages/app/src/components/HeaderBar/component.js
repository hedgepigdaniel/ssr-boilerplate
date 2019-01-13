/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import { LOG_OUT } from '../../actions';
import { MIN_PC_WIDTH_REM } from '../../responsive';

export const HeaderBarBackground = () => (
  <div
    css={css`
      grid-area: nav;
      background-color: hotpink;
    `}
  />
);

export const HeaderBar = ({
  apiKey,
  dispatch,
  backgroundStyle,
  contentStyle,
}) => (
  <Fragment>
    <div
      css={css`
        ${backgroundStyle};
        background-color: hotpink;
      `}
    />
    <header
      css={css`
        ${contentStyle};
        height: 6rem;
        line-height: 3rem;
        font-size: 1rem;

        display: grid;
        @media (min-width: ${MIN_PC_WIDTH_REM}rem) {
          grid-template-areas: 'title  .  user';
          grid-template-columns: auto 1fr auto;
          grid-template-rows: auto;
          height: 3rem;
        }
        grid-template-areas:
          'title'
          ' user';
        grid-template-rows: auto auto;
      `}
    >
      <span
        css={css`
          grid-area: title;
          font-size: 2rem;
        `}
      >
        TRADL
      </span>
      {apiKey && (
        <span
          css={css`
            grid-area: user;
          `}
          key="message"
        >
          Using key {apiKey}
          <button
            css={css`
              grid-area: user;
            `}
            key="button"
            type="button"
            onClick={() =>
              dispatch({
                type: LOG_OUT,
              })
            }
          >
            Log out
          </button>
        </span>
      )}
    </header>
  </Fragment>
);

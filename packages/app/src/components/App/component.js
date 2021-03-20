/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ConnectedHeaderBar } from '../HeaderBar/connector';
import {
  MIN_PC_WIDTH_REM,
  MIN_LARGE_PC_WIDTH_REM,
  TABLET_WIDTH_REM,
  FIXED_WIDTH,
  SMALL_PC_MARGIN,
  MOBILE_MARGIN,
  TABLET_MARGIN,
} from '../../responsive';
import { ConnectedContent } from '../Content/connector';

export const App = () => (
  <div
    css={css`
      display: grid;
      grid-template-columns: ${MOBILE_MARGIN}rem 1fr ${MOBILE_MARGIN}rem;
      grid-template-areas:
        '  .    nav    .  '
        '  .  content  .  '
        '  .  footer   .  ';
      grid-template-rows: auto auto 1fr;

      @media (min-width: ${TABLET_WIDTH_REM}rem) {
        grid-template-columns: ${TABLET_MARGIN}rem 1fr ${TABLET_MARGIN}rem;
      }

      @media (min-width: ${MIN_PC_WIDTH_REM}rem) {
        grid-template-columns: ${SMALL_PC_MARGIN}rem 1fr ${SMALL_PC_MARGIN}rem;
      }

      @media (min-width: ${MIN_LARGE_PC_WIDTH_REM}rem) {
        grid-template-columns: 1fr ${FIXED_WIDTH}rem 1fr;
      }
    `}
  >
    <ConnectedHeaderBar
      contentStyle={css`
        grid-area: nav;
      `}
      backgroundStyle={css`
        grid-area: splash;
        grid-row: 1;
        grid-column: 1/4;
      `}
    />
    <ConnectedContent
      css={css`
        grid-area: content;
      `}
    />
  </div>
);
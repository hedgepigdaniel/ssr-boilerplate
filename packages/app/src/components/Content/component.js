/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { LOG_IN, DASHBOARD } from "../../actions";
import { ConnectedLogin } from "../Login/connector";
import { ConnectedDashboard } from "../Dashboard/connector";

const ContentSwitch = ({ page }) => {
  switch (page) {
    case LOG_IN: {
      return <ConnectedLogin />;
    }
    case DASHBOARD: {
      return <ConnectedDashboard />;
    }
    default: {
      return <div>Error: unknown page</div>;
    }
  }
};

export const Content = (props) => (
  <div
    css={css`
      grid-area: content;
    `}
  >
    <ContentSwitch {...props} />
  </div>
);
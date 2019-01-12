import React from "react";
import { LOG_IN, DASHBOARD } from "../../actions";
import { ConnectedLogin } from "../Login/connector";
import { ConnectedDashboard } from "../Dashboard/connector";

export const Content = ({ page }) => {
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

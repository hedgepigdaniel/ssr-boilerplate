import React from "react";
import { LOG_IN } from "../../actions";
import { ConnectedLogin } from "../Login/connector";

export const App = ({ page }) => {
  switch (page) {
    case LOG_IN: {
      return <ConnectedLogin />;
    }
    default: {
      return <div>Error: unknown page</div>;
    }
  }
};

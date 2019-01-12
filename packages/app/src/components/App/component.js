import React from "react";
import { ConnectedHeaderBar } from "../HeaderBar/connector";
import { Content } from "../Content/component";

export const App = () => (
  <>
    <ConnectedHeaderBar />
    <Content />
  </>
);

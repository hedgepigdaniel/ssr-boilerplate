import { createSelector } from "reselect";

const selectLoginPage = (state) => state.loginPage;

export const selectDraftApiKey = createSelector(
  [selectLoginPage],
  (loginPage) => loginPage.apiKey || "",
);

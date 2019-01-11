// Copied from https://github.com/respond-framework/rudy/blob/22d0a9d8d28e1e74aaf04bb48b5e0f65a609cf81/packages/boilerplate/src/configureStore.server.js
import { doesRedirect } from "@respond-framework/rudy";

import { configureStore as configureStoreBrowser } from "./configureStore.browser";

export const configureStore = async (req, res) => {
  const { store, firstRoute } = configureStoreBrowser(undefined, req.path);
  const result = await store.dispatch(firstRoute());
  if (doesRedirect(result, res)) return false;

  const { status } = store.getState().location;
  res.status(status);

  return store;
};

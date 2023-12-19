import * as React from "react";

import { Context } from "../contexts/context";

export function useContext() {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("BackflipContext is not defined");
  }

  return context;
}

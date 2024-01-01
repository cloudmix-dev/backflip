import { useContext as baseUseContext } from "react";

import { Context } from "../contexts/context";

export function useContext() {
  const context = baseUseContext(Context);

  if (!context) {
    throw new Error("BackflipContext is not defined");
  }

  return context;
}

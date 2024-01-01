import { useContext as baseUseContext } from "solid-js";

import { Context } from "../contexts/context";

export function useContext() {
  return baseUseContext(Context);
}

import { useContext } from "react";

import { SlotContext } from "../contexts/slot";

export function useSlot() {
  return useContext(SlotContext);
}

import { createContext } from "react";

export const SlotContext = createContext<{
  slots: Record<string, React.ReactNode | React.ReactNode[]>;
  setSlot: (
    name: string,
    children: React.ReactNode | React.ReactNode[],
  ) => void;
}>({ slots: {}, setSlot: () => {} });

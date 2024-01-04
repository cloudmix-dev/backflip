import { useEffect } from "react";
import { useSlot } from "../hooks/use-slot";

export interface SlotProps {
  name: string;
  children?: React.ReactNode | React.ReactNode[];
}

export function Slot({ children, name }: SlotProps) {
  const { slots, setSlot } = useSlot();
  const toRender = !children ? slots[name] ?? null : children;

  useEffect(() => {
    if (children && slots[name] !== children) {
      setSlot(name, children);
    }
  }, [name, children, slots, setSlot]);

  return <>{toRender}</>;
}

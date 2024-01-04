import { Slot } from "@backflipjs/react";

export function Container({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full w-full">
      {children}
      <Slot name="footer" />
    </div>
  );
}

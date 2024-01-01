import { type Client, type Registry } from "@backflipjs/client";
import { useMemo } from "react";

import { Context } from "../contexts/context";

export interface ProviderProps extends React.PropsWithChildren {
  client: Client;
  devMode?: boolean;
  registry: Registry;
}

export function Provider({
  children,
  client,
  devMode,
  registry,
}: ProviderProps) {
  const context = useMemo(
    () => ({
      client,
      registry: registry as Registry<React.FC<React.PropsWithChildren>>,
    }),
    [client, registry],
  );

  if (devMode) {
    context.registry?.setDevMode(devMode);
  }

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

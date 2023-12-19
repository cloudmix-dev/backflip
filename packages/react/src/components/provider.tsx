import { type Client, type Registry } from "@backflipjs/client";
import { useMemo } from "react";

import { Context } from "../contexts/context";

interface ProviderProps {
  client: Client;
  devMode?: boolean;
  registry: Registry;
}

export function Provider({
  children,
  client,
  devMode,
  registry,
}: React.PropsWithChildren<ProviderProps>) {
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

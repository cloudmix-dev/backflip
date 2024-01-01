import { Client, Registry } from "@backflipjs/client";
import { type JSX, createSignal } from "solid-js";

import { Context } from "../contexts/context";

export interface ProviderProps {
  client: Client;
  children?: JSX.Element;
  devMode?: boolean;
  registry: Registry;
}

export function Provider({
  children,
  client,
  devMode,
  registry,
}: ProviderProps) {
  const [context] = createSignal({ client, registry });

  if (devMode) {
    registry.setDevMode(devMode);
  }

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

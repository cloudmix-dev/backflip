import { Client, Registry } from "@backflipjs/client";
import { type JSX, createSignal } from "solid-js";

import { Context } from "../contexts/context";

export interface ProviderProps {
  client: Client;
  children?: JSX.Element;
  devMode?: boolean;
  registry: Registry;
}

export function Provider(props: ProviderProps) {
  const [context] = createSignal({
    client: props.client,
    registry: props.registry,
  });

  if (props.devMode) {
    props.registry.setDevMode(props.devMode);
  }

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

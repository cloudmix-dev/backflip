import { type Client } from "@backflipjs/client";
import { type Accessor, createContext } from "solid-js";

import { type Registry } from "../registry";

export interface BackflipContext {
  client: Client;
  registry: Registry;
}

export const Context = createContext<Accessor<BackflipContext>>();

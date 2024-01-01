import { Client } from "@backflipjs/client";
import { type Accessor, createContext } from "solid-js";

import { type Registry } from "../registry";

export const Context =
  createContext<Accessor<{ client: Client; registry: Registry }>>();

import { type Client, type Registry } from "@backflipjs/client";
import { createContext } from "react";

export const Context = createContext<{
  client: Client;
  registry: Registry<React.FC<React.PropsWithChildren>>;
}>({
  client: {} as Client,
  registry: {} as Registry<React.FC<React.PropsWithChildren>>,
});

import { type Client } from "@backflipjs/client";
import { getContext, setContext } from "svelte";

const CLIENT = typeof Symbol !== "undefined" ? Symbol("client") : "@@client";

export function getClient(): Client {
  const client = getContext<Client | null>(CLIENT);

  if (!client) {
    throw new Error(
      "Client has not been set - call setClient(new Client({ ... })) to define it",
    );
  }

  return client as Client;
}

export function setClient(client: Client): void {
  setContext(CLIENT, client);
}

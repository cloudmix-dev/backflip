import { type APIEvent } from "@solidjs/start/server";

import { server } from "~/backflip/server";

export async function GET({ request }: APIEvent) {
  const content = await server.fetch(request);

  return content;
}

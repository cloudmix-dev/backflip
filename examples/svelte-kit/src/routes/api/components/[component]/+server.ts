import { type RequestEvent } from "@sveltejs/kit";

import { server } from "../../../../backflip/server.js";

export async function GET({ request }: RequestEvent) {
  const content = await server.fetch(request);

  return content;
}

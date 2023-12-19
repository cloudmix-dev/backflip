import { type LoaderFunction, json } from "@remix-run/node";

import { server } from "~/backflip/backflip.server";

export const loader: LoaderFunction = async ({ request }) => {
  const content = await server.fetch(request);

  return json(await content.json(), {
    status: content.status,
    headers: content.headers,
  });
};

import { type SuperJSONObject } from "@backflipjs/client";

import { getClient } from "./client.js";

export async function getComponentData(name: string, data?: SuperJSONObject) {
  try {
    const client = getClient();
    const newContentData = await client.send(name, data);

    return newContentData;
  } catch (_) {
    return _ as Error;
  }
}

// wrangler will bundle this "server.mjs" with prebuilt `remixBuild`
import { createRequestHandler } from "@remix-run/server-runtime";

import * as remixBuild from "../build/server/index.js";

const remixHandler = createRequestHandler(
  // biome-ignore lint/suspicious/noExplicitAny: we don't have the type for this
  remixBuild as any,
  process.env.NODE_ENV,
);

export default {
  fetch(request: Request, env: Record<string, unknown>) {
    Object.assign(globalThis, { env });

    return remixHandler(request);
  },
};

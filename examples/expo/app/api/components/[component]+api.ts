import { type ExpoRequest } from "expo-router/server";

import { server } from "../../../backflip/backflip.server";

export function GET(request: ExpoRequest) {
  return server.fetch(request as unknown as Request);
}

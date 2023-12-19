import { Provider } from "@backflipjs/react";
import { Slot } from "expo-router";

import { client, registry } from "../backflip/backflip.client";

export default function RootLayout() {
  return (
    <Provider client={client} registry={registry}>
      <Slot />
    </Provider>
  );
}

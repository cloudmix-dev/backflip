import { SecureStoreCache } from "@backflipjs/native";
import { Client, Registry } from "@backflipjs/react";

import { Button } from "../components/button";

const registry = new Registry();

registry.registerComponent(Button, { name: "Button" });

const client = new Client({
  url: "/api/components",
  cache: new SecureStoreCache(),
});

export { registry, client };

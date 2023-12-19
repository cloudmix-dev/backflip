import { SecureStoreCache } from "@backflipjs/native";
import { Client, Registry } from "@backflipjs/react";

import { Button } from "../components/button";
import { Container } from "../components/container";
import { Text } from "../components/text";

const registry = new Registry();

registry.registerComponent(Button, { name: "Button" });
registry.registerComponent(Container, { name: "Container" });
registry.registerComponent(Text, { name: "Text" });

const client = new Client({
  url: "/api/components",
  cache: new SecureStoreCache(),
});

export { registry, client };

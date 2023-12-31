import { IDBCache } from "@backflipjs/browser";
import { Client, Registry } from "@backflipjs/react";

import { Button } from "~/components/button";
import { Container } from "~/components/container";
import { DateTime } from "~/components/date-time";
import { Text } from "~/components/text";

const registry = new Registry();

registry.registerComponent(Button, { name: "Button" });
registry.registerComponent(Container, { name: "Container" });
registry.registerComponent(DateTime, { name: "DateTime" });
registry.registerComponent(Text, { name: "Text" });

const client = new Client({
  url: "/api/components",
  cache: new IDBCache(),
  context: () => ({
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
  }),
});

export { registry, client };

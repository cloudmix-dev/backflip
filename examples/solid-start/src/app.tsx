import {
  Provider,
  RenderComponent,
  type RenderedComponentConfig,
} from "@backflipjs/solidjs";

import { Button } from "~/components/button";
import { Container } from "~/components/container";
import { DateTime } from "~/components/date-time";
import { Text } from "~/components/text";

import { client, registry } from "~/backflip/client";
import "./global.css";

const DEFAULT: RenderedComponentConfig = {
  component: "Container",
  children: [
    {
      component: "Text",
      props: {
        content: "Below is a primary button",
      },
    },
    {
      component: "Button",
      props: {
        label: "Primary button",
        variant: "primary",
      },
    },
    {
      component: "DateTime",
      props: {
        date: new Date(),
        prefix: "It is now",
      },
    },
  ],
};

function Loading() {
  return (
    <Container>
      <Text.Skeleton />
      <Button.Skeleton />
      <DateTime.Skeleton />
    </Container>
  );
}

export default function App() {
  return (
    <Provider client={client} registry={registry}>
      <RenderComponent name="home" default={DEFAULT} loading={<Loading />} />
    </Provider>
  );
}

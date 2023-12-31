import {
  RenderComponent,
  type RenderedComponentConfig,
  Slot,
} from "@backflipjs/react";

import { Button } from "~/components/button";
import { Container } from "~/components/container";
import { DateTime } from "~/components/date-time";
import { Text } from "~/components/text";

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

export default function Home() {
  return (
    <RenderComponent
      name="home"
      default={DEFAULT}
      loading={
        <Container>
          <Text.Skeleton />
          <Button.Skeleton />
          <DateTime.Skeleton />
        </Container>
      }
    >
      <Slot name="footer">
        <Text content="This is the footer" />
      </Slot>
    </RenderComponent>
  );
}

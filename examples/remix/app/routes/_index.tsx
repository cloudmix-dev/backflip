import {
  RenderComponent,
  type RenderedComponentConfig,
} from "@backflipjs/react";

import { Button } from "~/components/button";
import { Container } from "~/components/container";
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
        </Container>
      }
    />
  );
}

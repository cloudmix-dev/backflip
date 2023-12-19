import { type RenderedComponentConfig } from "@backflipjs/react";

import { Button } from "../components/button";
import { Container } from "../components/container";
import { Text } from "../components/text";

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

import { RenderComponent } from "@backflipjs/react";

export default function HomeScreen() {
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

import {
  RenderComponent,
  type RenderedComponentConfig,
} from "@backflipjs/react";

import { Button } from "~/components/button";

const DEFAULT: RenderedComponentConfig = {
  component: "Container",
  props: {
    columns: 1,
  },
  children: [
    {
      component: "Button",
      props: {
        variant: "primary",
      },
      children: [
        {
          component: "Text",
          props: {
            content: "Default button",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <RenderComponent
      name="home"
      default={DEFAULT}
      loading={<Button.Skeleton />}
    />
  );
}

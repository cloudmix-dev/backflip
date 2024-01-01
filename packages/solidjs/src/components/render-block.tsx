import { type SuperJSONObject } from "@backflipjs/client";
import { For } from "solid-js";

import { useContext } from "../hooks/use-context";

interface RenderBlockProps {
  component: string;
  props?: SuperJSONObject;
  children?: RenderBlockProps[];
}

export function RenderBlock({
  component,
  props = {},
  children = [],
}: RenderBlockProps) {
  const context = useContext();
  const registry = context?.().registry;
  const El = registry?.get(component);

  if (!El) {
    return null;
  }

  return (
    <El {...props}>
      <For each={children}>
        {(child: RenderBlockProps) => <RenderBlock {...child} />}
      </For>
    </El>
  );
}

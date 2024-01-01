import { type SuperJSONObject } from "@backflipjs/client";
import { For } from "solid-js";

import { useContext } from "../hooks/use-context";

interface RenderBlockProps {
  component: string;
  props?: SuperJSONObject;
  children?: RenderBlockProps[];
}

export function RenderBlock(props: RenderBlockProps) {
  const context = useContext();
  const registry = context?.registry;
  const El = registry?.get(props.component);

  if (!El) {
    return null;
  }

  return (
    <El {...props.props}>
      <For each={props.children}>
        {(child: RenderBlockProps) => <RenderBlock {...child} />}
      </For>
    </El>
  );
}

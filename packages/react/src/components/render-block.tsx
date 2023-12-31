import { type SuperJSONObject } from "@backflipjs/client";

import { useContext } from "../hooks/use-context";

interface RenderBlockProps {
  component: string;
  props?: SuperJSONObject;
  children?: RenderBlockProps[];
}

export function RenderBlock({
  component,
  props = {},
  children,
}: RenderBlockProps) {
  const { registry } = useContext();
  const El = registry.get(component);

  if (!El) {
    return null;
  }

  return (
    <El {...props}>
      {children?.map((child, i) => (
        <RenderBlock key={`${component}_${child.component}_${i}`} {...child} />
      ))}
    </El>
  );
}

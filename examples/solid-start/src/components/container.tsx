import { type JSX } from "solid-js";

interface ContainerProps {
  children: JSX.Element;
}

export function Container(props: ContainerProps) {
  return (
    <div class="flex flex-col gap-4 justify-center items-center h-full w-full">
      {props.children}
    </div>
  );
}

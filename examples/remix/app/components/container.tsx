interface ContainerProps {
  columns?: number;
}

export function Container({
  children,
  columns,
}: React.PropsWithChildren<ContainerProps>) {
  let classes = "grid-cols-1";

  if (columns === 2) {
    classes = "grid-cols-2";
  }

  if (columns === 3) {
    classes = "grid-cols-3";
  }

  if (columns === 4) {
    classes = "grid-cols-4";
  }

  if (columns === 5) {
    classes = "grid-cols-5";
  }

  return <div className={`grid ${classes} gap-4`}>{children}</div>;
}

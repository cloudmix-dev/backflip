interface TextProps {
  content: string;
}

export function Text({ content }: React.PropsWithChildren<TextProps>) {
  return <span>{content}</span>;
}

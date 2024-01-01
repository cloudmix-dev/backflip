interface TextProps {
  content: string;
}

function Text({ content }: React.PropsWithChildren<TextProps>) {
  return <span>{content}</span>;
}

Text.Skeleton = function TextSkeleton() {
  return <div class="h-4 w-28 bg-zinc-200 rounded-md" />;
};

export { Text };

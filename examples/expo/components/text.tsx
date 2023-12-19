import { styled } from "nativewind";
import { Text as RNText } from "react-native";

const StyledText = styled(RNText);

interface TextProps {
  content: string;
}

function Text({ content }: TextProps) {
  return <StyledText className="text-[16px]">{content}</StyledText>;
}

Text.Skeleton = function TextSkeleton() {
  return <StyledText className="h-4 w-28 bg-zinc-200 rounded-md" />;
};

export { Text };

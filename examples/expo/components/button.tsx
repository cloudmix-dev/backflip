import { styled } from "nativewind";
import { Pressable, Text, View } from "react-native";

const StyledPressable = styled(Pressable);
const StyledView = styled(View);
const StyledText = styled(Text);

interface ButtonProps {
  label: string;
  variant: "primary" | "secondary";
}

function Button({ label, variant }: ButtonProps) {
  const classes = variant === "primary" ? "bg-indigo-600" : "bg-emerald-600";

  return (
    <StyledPressable
      className={`inline-flex justify-center items-center rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${classes}`}
    >
      <StyledText className="text-white text-[16px]">{label}</StyledText>
    </StyledPressable>
  );
}

Button.Skeleton = function ButtonSkeleton() {
  return (
    <StyledView className="inline-flex justify-center items-center rounded-md h-8 w-36 text-sm bg-zinc-300 shadow-sm animate-pulse">
      <StyledView className="h-4 w-28 bg-zinc-200 rounded-md" />
    </StyledView>
  );
};

export { Button };

import { styled } from "nativewind";
import { View } from "react-native";

const StyledView = styled(View);

export function Container({ children }: React.PropsWithChildren) {
  return (
    <StyledView
      className="flex-1 justify-center items-center"
      style={{ gap: 16 }}
    >
      {children}
    </StyledView>
  );
}

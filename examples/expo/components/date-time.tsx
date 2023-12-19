import { Text } from "./text";

interface DateProps {
  date: Date;
  prefix?: string;
}

function DateTime({ date, prefix }: DateProps) {
  return (
    <Text
      content={`${
        prefix ? `${prefix} ` : ""
      }${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
    />
  );
}

DateTime.Skeleton = Text.Skeleton;

export { DateTime };

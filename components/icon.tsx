import { withOpacity } from "@/lib/utils";
import type { ComponentType } from "react";
import React from "react";
import { View } from "react-native";

type AppIconProps<T extends ComponentType<any>> = {
  IconComponent: T;
  name: React.ComponentProps<T>["name"];
  color: string;
  size?: number;
  backgroundSize?: number;
};

export function AppIcon<T extends ComponentType<any>>({
  IconComponent,
  name,
  color,
  size = 20,
  backgroundSize = 30,
}: AppIconProps<T>) {
  return (
    <View
      className="items-center justify-center rounded-full"
      style={{
        backgroundColor: withOpacity(color, 0.1),
        width: backgroundSize,
        height: backgroundSize,
      }}
    >
      <IconComponent {...({ name, size, color } as React.ComponentProps<T>)} />
    </View>
  );
}

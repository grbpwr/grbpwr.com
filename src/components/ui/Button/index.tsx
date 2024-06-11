import { getComponentByStyle, LinkStyle } from "./styles";
import React from "react";
import { Slot } from "@radix-ui/react-slot";

export default function Button({
  style = LinkStyle.default,
  asChild,
  children,
  ...props
}: {
  style?: LinkStyle;
  asChild?: boolean;
  children: React.ReactNode;
  [k: string]: any;
}) {
  const Component = asChild ? Slot : "button";
  const ComponentStyle = getComponentByStyle(style);

  return (
    <div>
      {/* @ts-ignore */}
      <Component {...props}>
        <ComponentStyle>{children}</ComponentStyle>
      </Component>
    </div>
  );
}
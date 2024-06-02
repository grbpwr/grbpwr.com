import Link from "next/link";
import { getComponentByStyle, LinkStyle } from "./styles";
import React from "react";

export default function GlobalLink({
  style = LinkStyle.default,
  href,
  children,
  className,
}: {
  style?: LinkStyle;
  href: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const Component = getComponentByStyle(style);

  return (
    <div className={className}>
      <Link href={href}>
        <Component>{children}</Component>
      </Link>
    </div>
  );
}

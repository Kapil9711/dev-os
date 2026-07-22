import { PropsWithChildren } from "react";
import clsx from "clsx";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export default function Container({ children, className }: ContainerProps) {
  return <div className={clsx("mx-auto w-full max-w-7xl px-6 lg:px-10", className)}>{children}</div>;
}

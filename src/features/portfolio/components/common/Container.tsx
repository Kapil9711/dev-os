import { PropsWithChildren } from "react";
import clsx from "clsx";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx("@7xl:px-10 max-w-8xl mx-auto w-full px-3", className)}
    >
      {children}
    </div>
  );
}

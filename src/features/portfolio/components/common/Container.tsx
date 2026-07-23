import { PropsWithChildren } from "react";
import clsx from "clsx";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx("@7xl:px-10 mx-auto w-full max-w-7xl px-3", className)}
    >
      {children}
    </div>
  );
}

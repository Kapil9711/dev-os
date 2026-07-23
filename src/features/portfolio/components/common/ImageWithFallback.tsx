"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackLabel?: string;
}

export default function ImageWithFallback({
  fallbackLabel,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 border border-dashed border-white/15 bg-gradient-to-br from-white/10 to-white/[0.02] text-center">
        <span className="text-lg opacity-40">🖼️</span>
        <span className="px-2 font-mono text-[10px] text-white/40">
          {fallbackLabel ?? String(props.src)}
        </span>
      </div>
    );
  }

  return <Image alt={alt} onError={() => setErrored(true)} {...props} />;
}

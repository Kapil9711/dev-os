"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;

      const value = (window.scrollY / total) * 100;

      setProgress(value);
    };

    update();

    window.addEventListener("scroll", update);

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[999] h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-150"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}

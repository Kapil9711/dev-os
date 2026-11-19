"use client";

interface JourneyTimelineDotProps {
  isVisible: boolean;
  isLeft: boolean;
}

export function JourneyTimelineDot({
  isVisible,
  isLeft,
}: JourneyTimelineDotProps) {
  return (
    <>
      {/* Timeline dot */}
      <div
        className="absolute left-4 top-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-4 transition-all duration-700 @5xl:left-1/2"
        style={{
          borderColor: "var(--bg-void)",
          background: "var(--accent-2)",
          boxShadow: isVisible
            ? "0 0 0 5px rgba(108,99,255,0.15), 0 0 20px rgba(108,99,255,0.4)"
            : "0 0 0 0px rgba(108,99,255,0)",
        }}
      >
        <span
          className="absolute h-2 w-2 rounded-full transition-transform duration-700"
          style={{
            background: "var(--text-1)",
            transform: isVisible ? "scale(1)" : "scale(0)",
          }}
        />
      </div>

      {/* Connecting stub, desktop only */}
      <div
        className={`absolute top-[38px] hidden h-px transition-all duration-700 @5xl:block ${
          isLeft ? "left-1/2 right-[54%]" : "left-[54%] right-1/2"
        }`}
        style={{
          background: "linear-gradient(90deg, var(--accent-2), transparent)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: isLeft ? "left" : "right",
        }}
      />
    </>
  );
}

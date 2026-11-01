"use client";

import {
  Children,
  Fragment,
  isValidElement,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

export interface ScrollStackItemProps {
  children?: ReactNode;
  itemClassName?: string;
  style?: CSSProperties;
}

export interface ScrollStackProps {
  children?: ReactNode;
  className?: string;
  itemDistance?: number;
  itemStackDistance?: number;
  stackPosition?: number | string;
  itemScale?: number;
  baseScale?: number;
  dimAmount?: number;
  blurAmount?: number;
  tiltAmount?: number;
  rotationAmount?: number;
  holdDistance?: number;
  smoothScroll?: boolean;
  snap?: boolean;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

interface StackSettings {
  itemDistance: number;
  itemStackDistance: number;
  stackPosition: number | string;
  itemScale: number;
  baseScale: number;
  dimAmount: number;
  blurAmount: number;
  tiltAmount: number;
  rotationAmount: number;
  holdDistance: number;
  smoothScroll: boolean;
  snap: boolean;
  onStackComplete?: () => void;
}

const CARD_SHADOW = [
  "0 0 0 1px light-dark(rgb(0 0 0 / 0.06), rgb(255 255 255 / 0.08))",
  "0 -12px 40px -16px rgb(0 0 0 / 0.35)",
  "0 24px 48px -24px rgb(0 0 0 / 0.4)",
].join(", ");

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const scrollsInside = (
  node: Element | null,
  stop: Element,
  delta: number,
): boolean => {
  for (
    let element: Element | null = node;
    element && element !== stop;
    element = element.parentElement
  ) {
    if (element.scrollHeight <= element.clientHeight + 1) {
      continue;
    }

    const overflow = getComputedStyle(element).overflowY;

    if (overflow !== "auto" && overflow !== "scroll") {
      continue;
    }

    if (
      delta > 0
        ? element.scrollTop + element.clientHeight < element.scrollHeight - 1
        : element.scrollTop > 0
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Individual stack item.
 *
 * The item is a container-query boundary. Its children can adapt to the
 * width of the card, and its height is determined by its content.
 */
export const ScrollStackItem = ({
  children,
  itemClassName = "",
  style,
}: ScrollStackItemProps) => (
  <div
    className={[
      "@container",
      "relative",
      "box-border",
      "min-h-0",
      "w-full",
      "min-w-0",
      "origin-top",
      "overflow-hidden",
      "rounded-2xl",
      "p-2",
      "@3xl:p-3",
      "will-change-transform",
      // "[background:light-dark(#ffffff,#18181b)]",
      "[color:light-dark(#18181b,#fafafa)]",

      itemClassName,
    ]
      .filter(Boolean)
      .join(" ")}
    style={{
      boxShadow: CARD_SHADOW,
      ...style,
    }}
  >
    {children}

    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black opacity-[var(--scroll-stack-dim,0)]"
    />
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 60,
  itemStackDistance = 20,
  stackPosition = "50%",
  itemScale = 0.025,
  baseScale = 0.94,
  dimAmount = 0.15,
  blurAmount = 0,
  tiltAmount = 0,
  rotationAmount = 0,
  holdDistance = 120,
  smoothScroll = true,
  snap = false,
  useWindowScroll = false,
  onStackComplete,
}: ScrollStackProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const settingsRef = useRef<StackSettings | null>(null);
  const scheduleRef = useRef<(() => void) | null>(null);

  const items = Children.toArray(children);

  useLayoutEffect(() => {
    settingsRef.current = {
      itemDistance,
      itemStackDistance,
      stackPosition,
      itemScale,
      baseScale,
      dimAmount,
      blurAmount,
      tiltAmount,
      rotationAmount,
      holdDistance,
      smoothScroll,
      snap,
      onStackComplete,
    };

    scheduleRef.current?.();
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    const inner: any = innerRef.current;
    const end = endRef.current;

    if (!root || !inner || !end) return;

    const windowed = useWindowScroll;
    const target: Window | HTMLDivElement = windowed ? window : root;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const cache = new Map<string, string | number>();

    let frame = 0;
    let glide = 0;
    let rest = 0;

    let complete = false;
    let gliding = false;
    let pressed = false;

    let current = 0;
    let goal = 0;
    let written = 0;
    let last = 0;

    let points: number[] = [];
    let reach = 0;

    const readScroll = () => (windowed ? window.scrollY : root.scrollTop);

    const maxScroll = () =>
      windowed
        ? Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight,
          )
        : Math.max(0, root.scrollHeight - root.clientHeight);

    const writeScroll = (value: number) => {
      written = value;

      if (windowed) {
        window.scrollTo(0, value);
      } else {
        root.scrollTop = value;
      }
    };

    const write = <T extends string | number>(
      key: string,
      value: T,
      apply: (value: T) => void,
    ) => {
      if (cache.get(key) === value) return false;

      cache.set(key, value);
      apply(value);

      return true;
    };

    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    /**
     * Recalculate the stack from the actual scroll container's height.
     *
     * For normal container scrolling:
     *   viewHeight = root.clientHeight
     *
     * For window scrolling:
     *   viewHeight = window.innerHeight
     *
     * The first card's top is calculated from its actual height, so its
     * vertical center aligns with the center of the visible scroll area.
     */
    const update = () => {
      frame = 0;

      const settings = settingsRef.current;

      const slots: any = Array.from(inner.children).filter(
        (child): child is HTMLElement =>
          child instanceof HTMLElement && child.hasAttribute("data-stack-slot"),
      );

      if (!settings || !slots.length) return;

      // Use the actual scroll viewport, not the outer page/container height.
      const viewHeight = windowed ? window.innerHeight : root.clientHeight;

      const viewTop = windowed
        ? 0
        : root.getBoundingClientRect().top + root.clientTop;

      // Read actual rendered heights, including container-query layout changes.
      const heights: any = slots.map((slot: any) => slot.offsetHeight);

      const firstHeight = heights[0] ?? 0;

      // Center the first card in the scroll container.
      const stackTop = (viewHeight - firstHeight) / 2;

      const offset = settings.itemStackDistance;

      // Keep enough top space for the first card to reach its centered position.
      const padTop = windowed ? 0 : Math.max(0, stackTop);

      // Position every stacked card relative to the same center anchor.
      // The stack remains consistent even when the viewport/container changes.
      let moved = false;

      slots.forEach((slot: any, index: number) => {
        const top = stackTop + index * offset;

        moved =
          write(`slotTop${index}`, top, (value) => {
            slot.style.top = `${value}px`;
          }) || moved;
      });

      const lastPin = stackTop + (slots.length - 1) * offset;

      const lastHeight = heights[heights.length - 1] ?? 0;

      const endHeight =
        settings.holdDistance +
        (windowed ? 0 : Math.max(0, viewHeight - lastPin - lastHeight));

      moved =
        write("padTop", padTop, (value) => {
          inner.style.paddingTop = `${value}px`;
        }) || moved;

      moved =
        write("endHeight", endHeight, (value) => {
          end.style.height = `${value}px`;
        }) || moved;

      // Measure the current flow positions after the padding has been applied.
      let flow =
        inner.getBoundingClientRect().top - viewTop + readScroll() + padTop;

      points = heights.map((height: any, index: any) => {
        // Each snap point uses the same centered stack position.
        const point = flow - stackTop - index * offset;

        flow += height + settings.itemDistance;

        return point;
      });

      reach = Math.max(
        40,
        ((heights[0] ?? 0) + settings.itemDistance - offset) / 2,
      );

      const depths: any = slots.map(() => 0);

      let lastCover = 0;

      for (let j = 1; j < slots.length; j++) {
        const pinBefore = viewTop + stackTop + (j - 1) * offset;

        const start = pinBefore + heights[j - 1];

        const span = Math.max(1, start - pinBefore - offset);

        const cardTop = slots[j].getBoundingClientRect().top;

        const cover = clamp((start - cardTop) / span, 0, 1);

        for (let i = 0; i < j; i++) {
          depths[i] += cover;
        }

        lastCover = cover;
      }

      const dimStep = clamp(settings.dimAmount, 0, 1);

      slots.forEach((slot: any, index: number) => {
        const card = slot.firstElementChild as HTMLElement | null;

        if (!card) return;

        const depth = depths[index];
        const lean = Math.min(depth, 1);

        const scale = Math.max(
          Math.min(settings.baseScale, 1),
          1 - depth * settings.itemScale,
        );

        const tilt = -lean * settings.tiltAmount;

        const turn = lean * settings.rotationAmount * (index % 2 ? -1 : 1);

        const blur = depth * settings.blurAmount;

        const dim = 1 - Math.pow(1 - dimStep, depth);

        const transform =
          depth < 0.0005
            ? ""
            : `perspective(1200px) rotateX(${tilt.toFixed(
                2,
              )}deg) rotate(${turn.toFixed(2)}deg) scale(${scale.toFixed(4)})`;

        moved =
          write(`transform${index}`, transform, (value) => {
            card.style.transform = value;
          }) || moved;

        moved =
          write(
            `filter${index}`,
            blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "",
            (value) => {
              card.style.filter = value;
            },
          ) || moved;

        moved =
          write(`dim${index}`, dim.toFixed(3), (value) => {
            card.style.setProperty("--scroll-stack-dim", value);
          }) || moved;
      });

      const done = slots.length > 1 && lastCover >= 0.999;

      if (done !== complete) {
        complete = done;

        if (done) {
          settings.onStackComplete?.();
        }
      }

      if (moved) {
        schedule();
      }
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);

      last = now;

      if (Math.abs(readScroll() - written) > 2) {
        gliding = false;
        glide = 0;
        settleSoon();
        return;
      }

      current += (goal - current) * (1 - Math.pow(0.9, dt * 60));

      if (Math.abs(goal - current) < 0.5) {
        current = goal;
      }

      writeScroll(current);

      if (current === goal) {
        gliding = false;
        glide = 0;
        settleSoon();
        return;
      }

      glide = requestAnimationFrame(step);
    };

    const glideTo = (value: number) => {
      goal = clamp(value, 0, maxScroll());

      if (motion.matches) {
        writeScroll(goal);
        schedule();
        return;
      }

      if (gliding) return;

      gliding = true;
      current = readScroll();
      written = current;
      last = performance.now();

      glide = requestAnimationFrame(step);
    };

    const settle = () => {
      rest = 0;

      if (!settingsRef.current?.snap || gliding || pressed || !points.length) {
        return;
      }

      const now = readScroll();

      const nearest = points.reduce((best, point) =>
        Math.abs(point - now) < Math.abs(best - now) ? point : best,
      );

      const gap = Math.abs(nearest - now);

      if (gap > 1 && gap < reach) {
        glideTo(nearest);
      }
    };

    const settleSoon = () => {
      window.clearTimeout(rest);
      rest = window.setTimeout(settle, 140);
    };

    const onScroll = () => {
      schedule();

      if (!gliding) {
        settleSoon();
      }
    };

    const onWheel = (input: Event) => {
      const event = input as WheelEvent;
      const settings = settingsRef.current;

      if (
        !settings?.smoothScroll ||
        motion.matches ||
        event.defaultPrevented ||
        event.ctrlKey
      ) {
        return;
      }

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      const page = windowed ? window.innerHeight : root.clientHeight;

      const delta =
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? page : 1);

      if (
        !delta ||
        scrollsInside(
          event.target as Element | null,
          windowed ? document.body : root,
          delta,
        )
      ) {
        return;
      }

      const base = gliding ? goal : readScroll();

      if (
        (delta < 0 && base <= 0) ||
        (delta > 0 && base >= maxScroll() - 0.5)
      ) {
        return;
      }

      event.preventDefault();

      window.clearTimeout(rest);
      glideTo(base + delta);
    };

    const onPress = () => {
      pressed = true;
      window.clearTimeout(rest);
    };

    const onRelease = () => {
      if (!pressed) return;

      pressed = false;
      settleSoon();
    };

    // Observe both the container and the individual cards.
    // Container queries can change card heights without a window resize.
    const observer = new ResizeObserver(schedule);

    observer.observe(root);
    observer.observe(inner);

    slotsForObservation();

    function slotsForObservation() {
      Array.from(inner.children).forEach((child) => {
        if (
          child instanceof HTMLElement &&
          child.hasAttribute("data-stack-slot")
        ) {
          observer.observe(child);

          if (child.firstElementChild instanceof HTMLElement) {
            observer.observe(child.firstElementChild);
          }
        }
      });
    }

    target.addEventListener("scroll", onScroll, {
      passive: true,
    });

    target.addEventListener("wheel", onWheel, {
      passive: false,
    });

    target.addEventListener("pointerdown", onPress, {
      passive: true,
    });

    window.addEventListener("pointerup", onRelease, {
      passive: true,
    });

    window.addEventListener("pointercancel", onRelease, {
      passive: true,
    });

    window.addEventListener("resize", schedule);

    scheduleRef.current = schedule;

    update();

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(glide);

      window.clearTimeout(rest);

      observer.disconnect();

      target.removeEventListener("scroll", onScroll);
      target.removeEventListener("wheel", onWheel);
      target.removeEventListener("pointerdown", onPress);

      window.removeEventListener("pointerup", onRelease);
      window.removeEventListener("pointercancel", onRelease);
      window.removeEventListener("resize", schedule);

      scheduleRef.current = null;
    };
  }, [useWindowScroll]);

  return (
    <div
      ref={rootRef}
      className={[
        "@container",
        "relative",
        "w-full",
        "min-w-0",
        useWindowScroll
          ? "overflow-x-hidden"
          : "h-full overflow-y-auto overflow-x-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div ref={innerRef} className="relative min-w-0 px-2 @3xl:px-3">
        {items.map((child, index) => {
          const gap = itemDistance - (items.length - index) * itemStackDistance;

          return (
            <Fragment
              key={isValidElement(child) ? (child.key ?? index) : index}
            >
              {index > 0 && (
                <div
                  aria-hidden="true"
                  style={{
                    height: Math.max(0, gap),
                    marginTop: Math.min(0, gap),
                  }}
                />
              )}

              <div
                data-stack-slot=""
                className="sticky w-full min-w-0"
                style={{
                  // The precise top is calculated from root.clientHeight
                  // and the first card's measured height inside update().
                  top: 0,
                  marginBottom: (items.length - 1 - index) * itemStackDistance,
                  zIndex: index + 1,
                }}
              >
                {child}
              </div>
            </Fragment>
          );
        })}

        <div ref={endRef} aria-hidden="true" />
      </div>
    </div>
  );
};

export default ScrollStack;

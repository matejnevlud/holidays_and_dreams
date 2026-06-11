import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type Options = {
  duration?: number;
  /** Formats the live value (e.g. thousands separator). */
  format?: (value: number) => string;
};

/**
 * Counts from 0 → `target` once the returned ref scrolls into view.
 * Returns the ref to attach and the current display string.
 * Under reduced motion it shows the final value immediately.
 */
export function useCountUp(
  target: number,
  { duration = 1.6, format }: Options = {},
) {
  const ref = useRef<HTMLSpanElement>(null);
  // Vertical-only inset: a plain "-15%" would also inset horizontally and
  // permanently exclude elements near the left/right viewport edge.
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, reduce, target, duration]);

  const rounded = Math.round(value);
  return { ref, display: format ? format(rounded) : String(rounded) };
}

/** Czech-style thousands separator: 7000 → "7 000". */
export function formatThousands(value: number) {
  return value.toLocaleString("cs-CZ");
}

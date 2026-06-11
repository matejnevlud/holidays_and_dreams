import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to delay the entrance. */
  delay?: number;
  /** Direction the element rises/slides from. */
  from?: "up" | "down" | "left" | "right";
  /** Distance in px to travel. */
  distance?: number;
  as?: ElementType;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "ref">;

/**
 * Fades + slides its children in once, when scrolled into view.
 * GPU-only (opacity/transform). Renders static under reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  distance = 24,
  as = "div",
  className,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }[from];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

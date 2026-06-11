import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

/** Shared variant for items inside a <Stagger>. Applied by <StaggerItem>. */
const revealItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

type StaggerProps = {
  children: ReactNode;
  /** Seconds between each child's entrance. */
  each?: number;
  /** Initial delay before the first child. */
  delay?: number;
  as?: ElementType;
  className?: string;
  /** Extra props forwarded to the rendered element (e.g. onSubmit on a form). */
  [key: string]: unknown;
};

/**
 * Parent container that cascades its <StaggerItem> children into view.
 * Renders static under reduced motion.
 */
export function Stagger({
  children,
  each = 0.08,
  delay = 0,
  as = "div",
  className,
  ...rest
}: StaggerProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8%" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: each, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export function StaggerItem({
  children,
  as = "div",
  className,
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={revealItem}>
      {children}
    </MotionTag>
  );
}

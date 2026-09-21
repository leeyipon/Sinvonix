"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { forwardRef, type ComponentProps, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

/**
 * Scroll-reveal wrapper. Fades + slides content into view once.
 * Respects prefers-reduced-motion (renders instantly, no transform).
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "span" | "li";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const from = reduce ? {} : offset[direction];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its <Stagger.Item> children on view. */
const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const Stagger = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
    once?: boolean;
  } & Omit<ComponentProps<typeof motion.div>, "variants" | "className" | "children" | "ref">
>(function Stagger({ children, className, once = true, ...rest }, ref) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerParent}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once, margin: "-60px" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

/**
 * Child of <Stagger>. Exported directly (not as Stagger.Item) so it works
 * when imported into React Server Components — property access on a client
 * reference proxy would be undefined across the RSC boundary.
 */
export function StaggerItem({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof motion.div>, "variants" | "className" | "children">) {
  return (
    <motion.div variants={staggerChild} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

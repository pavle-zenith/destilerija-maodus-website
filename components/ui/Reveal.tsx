"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const viewport = { once: true, amount: 0.2 } as const;

/**
 * Fades + slides a block into view on scroll. Renders a single motion element
 * (pass the target's className so no extra wrapper div is introduced).
 * Disabled under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  /** position in a group — drives the stagger delay */
  index?: number;
  href?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
};

/**
 * A single staggered item for card grids / lists. Renders `motion.a` when a
 * href is given (so it stays the grid/flex item and keeps its layout class),
 * otherwise `motion.div`.
 */
export function RevealItem({
  children,
  className,
  index = 0,
  href,
  style,
  ...rest
}: ItemProps) {
  const reduce = useReducedMotion();
  const common = {
    className,
    style,
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport,
    transition: {
      duration: 0.5,
      ease: EASE,
      delay: Math.min(index * 0.08, 0.4),
    },
    ...rest,
  };

  if (href !== undefined) {
    return (
      <motion.a href={href} {...common}>
        {children}
      </motion.a>
    );
  }
  return <motion.div {...common}>{children}</motion.div>;
}

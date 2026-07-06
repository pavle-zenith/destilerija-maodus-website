"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import styles from "./StoryReveal.module.css";

/**
 * Editorial scroll-linked "fill" for the Priča story: the paragraph starts as
 * dim outline text and each word brightens to full ink as the block scrolls
 * through the viewport, with a warm gold accent on the leading edge. Reduced
 * motion renders the text fully lit and static.
 */
export function StoryReveal({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // start filling as the block enters the lower third, finish before it exits
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");

  if (reduce) {
    return (
      <p ref={ref} className={`${styles.story} ${styles.static}`}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={styles.story} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // dim -> lit over the word's slice of the scroll range
  const opacity = useTransform(progress, range, [0.18, 1]);
  // brief gold flash on the leading edge as it lights up, then settles to ink
  const mid = range[0] + (range[1] - range[0]) * 0.5;
  const color = useTransform(
    progress,
    [range[0], mid, range[1]],
    ["var(--body)", "var(--gold)", "var(--body)"],
  );
  return (
    <span className={styles.word} aria-hidden="true">
      <motion.span className={styles.wordInk} style={{ opacity, color }}>
        {children}
      </motion.span>
      {" "}
    </span>
  );
}

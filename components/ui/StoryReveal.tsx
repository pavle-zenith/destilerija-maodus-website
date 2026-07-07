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
 * through the viewport, with a warm gold accent on the leading edge. The key
 * "how it's made" sentence (`emphasis`) settles into the red accent instead of
 * plain ink. Reduced motion renders the text fully lit and static.
 */
export function StoryReveal({
  text,
  emphasis,
}: {
  text: string;
  emphasis?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // start filling as the block enters the lower third, finish before it exits
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");
  // word-index range [start, end) of the emphasized sentence within `text`.
  // matching on the raw substring keeps it robust to punctuation inside words.
  const emphasisRange = getEmphasisRange(text, emphasis);
  const isEmphasized = (i: number) =>
    emphasisRange !== null && i >= emphasisRange[0] && i < emphasisRange[1];

  if (reduce) {
    if (!emphasisRange) {
      return (
        <p ref={ref} className={`${styles.story} ${styles.static}`}>
          {text}
        </p>
      );
    }
    // static fallback: wrap the emphasized run in a red span
    return (
      <p ref={ref} className={`${styles.story} ${styles.static}`}>
        {words.map((word, i) => (
          <span key={i} className={isEmphasized(i) ? styles.accent : undefined}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={styles.story} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            accent={isEmphasized(i)}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

/**
 * Locate the emphasized sentence's word span. Returns [startIdx, endIdx) into
 * the space-split word array, or null if `emphasis` is absent or not found
 * (so a copy edit that desyncs the two just drops the highlight, never throws).
 */
function getEmphasisRange(
  text: string,
  emphasis?: string,
): [number, number] | null {
  if (!emphasis) return null;
  const at = text.indexOf(emphasis);
  if (at < 0) return null;
  const before = text.slice(0, at).trim();
  const startIdx = before === "" ? 0 : before.split(" ").length;
  const wordCount = emphasis.trim().split(" ").length;
  return [startIdx, startIdx + wordCount];
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  // dim -> lit over the word's slice of the scroll range
  const opacity = useTransform(progress, range, [0.18, 1]);
  // brief gold flash on the leading edge as it lights up, then settles — to the
  // red accent for the emphasized "how it's made" sentence, plain ink otherwise
  const settled = accent ? "var(--red)" : "var(--body)";
  const mid = range[0] + (range[1] - range[0]) * 0.5;
  const color = useTransform(
    progress,
    [range[0], mid, range[1]],
    [settled, "var(--gold)", settled],
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

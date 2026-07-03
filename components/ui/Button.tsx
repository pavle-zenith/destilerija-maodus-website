"use client";

import Link from "next/link";
import type { ReactNode, MouseEvent } from "react";
import { track } from "@/lib/analytics";
import styles from "./Button.module.css";

type Variant = "red" | "dark" | "outline" | "outlineDark" | "outlineGold" | "text";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** red drop-shadow glow (hero / final CTA) */
  glow?: boolean;
  className?: string;
  /** analytics label; omit to skip tracking */
  track?: string;
};

type LinkProps = BaseProps & {
  href: string;
  onClick?: (e: MouseEvent) => void;
};

type ButtonProps = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  ariaLabel?: string;
};

function classes(variant: Variant, size: Size, glow?: boolean, extra?: string) {
  return [
    styles.btn,
    styles[variant],
    styles[size],
    glow ? styles.glow : "",
    extra ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button(props: LinkProps | ButtonProps) {
  const {
    children,
    variant = "red",
    size = "md",
    glow,
    className,
    track: trackLabel,
  } = props;

  const cls = classes(variant, size, glow, className);

  const handleTrack = (e: MouseEvent) => {
    if (trackLabel) track.cta(trackLabel, "href" in props ? props.href : undefined);
    props.onClick?.(e);
  };

  if ("href" in props && props.href !== undefined) {
    const isAnchor = props.href.startsWith("#") || props.href.startsWith("tel:") || props.href.startsWith("mailto:");
    if (isAnchor) {
      return (
        <a href={props.href} className={cls} onClick={handleTrack}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls} onClick={handleTrack}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={cls}
      onClick={handleTrack}
      disabled={props.disabled}
      aria-label={props.ariaLabel}
    >
      {children}
    </button>
  );
}

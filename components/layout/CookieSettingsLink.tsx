"use client";

import type { ReactNode } from "react";

export function CookieSettingsLink({
  className,
  children = "Kolačići",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href="#"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event("open-cookie-settings"));
      }}
    >
      {children}
    </a>
  );
}

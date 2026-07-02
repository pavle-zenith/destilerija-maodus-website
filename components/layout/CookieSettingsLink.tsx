"use client";

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <a
      href="#"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event("open-cookie-settings"));
      }}
    >
      Kolačići
    </a>
  );
}

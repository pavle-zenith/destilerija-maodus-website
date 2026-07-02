import type { SVGProps } from "react";

/** Hand-drawn, stroke-based icon set copied from the design (stroke-width 1.6, round caps). */
const paths: Record<string, React.ReactNode> = {
  // trust strip
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.2l-1.4 7.8L12 18.6l4.4 2.4L15 13.2" />
    </>
  ),
  drop: <path d="M12 3s5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 5-9 5-9z" />,
  flask: (
    <path d="M9.5 3h5M10.5 3v5.5l-4.6 8.2A2 2 0 0 0 7.6 20h8.8a2 2 0 0 0 1.7-3.3L13.5 8.5V3" />
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 4 13C4 8 8 4 20 4c0 8-4 12-9 12z" />
      <path d="M4.5 19.5c2.8-3.8 6-6 10-7" />
    </>
  ),
  // b2b
  checkCircle: (
    <>
      <path d="M8.5 12l2.5 2.5 4.5-5" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h10" />,
  goblet: (
    <>
      <rect x="3.5" y="9" width="17" height="11.5" rx="1" />
      <path d="M3.5 13h17M12 9v11.5M12 9c-1-2.4-2.6-4-4.2-3.2C6.3 6.5 8 9 12 9zm0 0c1-2.4 2.6-4 4.2-3.2C17.7 6.5 16 9 12 9z" />
    </>
  ),
  tag: (
    <>
      <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-6.2-6.2A2 2 0 0 1 3.8 13V6.2a2 2 0 0 1 2-2H12a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8z" />
      <circle cx="8" cy="8" r="1.4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
};

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 24, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

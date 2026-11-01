// A small hand-drawn icon set: square line ends and mitered joins on a 24px grid. Icons appear
// only where they clarify an action (leaving the site, printing, switching theme) or connect a diagram.

const paths = {
  "arrow-left": "M19 12H5M11 6l-6 6 6 6",
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-up": "M12 19V5M6 11l6-6 6 6",
  "arrow-up-down": "M8 20V4M4 8l4-4 4 4M16 4v16M12 16l4 4 4-4",
  "arrow-up-right": "M7 17 17 7M8 7h9v9",
  download: "M12 4v11M7 10l5 5 5-5M5 20h14",
  printer: "M7 9V4h10v5M7 17H4v-8h16v8h-3M7 14h10v6H7z",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  moon: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z",
} as const;

export type IconName = keyof typeof paths;

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className = "size-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}

type IconName =
  | "archive"
  | "book"
  | "bot"
  | "calendar"
  | "clock"
  | "fire"
  | "globe"
  | "mail"
  | "moon"
  | "search"
  | "settings"
  | "smartphone"
  | "star"
  | "sun"
  | "tag";

const paths: Record<IconName, string> = {
  archive: "M3 6h18M5 6v14h14V6M8 10h8M9 3h6l1 3H8l1-3Z",
  book: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5ZM4 5.5V22",
  bot: "M9 9h6M9 13h.01M15 13h.01M12 3v3M8 6h8a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4ZM2 11v4M22 11v4",
  calendar: "M6 3v3M18 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z",
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  fire: "M12 21a6 6 0 0 0 6-6c0-4-3-6-4-9-2 2-3 4-3 6a3 3 0 0 1-6 0c0-1 .2-2 .5-3C3.8 12 6 15 6 17a6 6 0 0 0 6 4Z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
  mail: "M4 6h16v12H4V6ZM4 7l8 6 8-6",
  moon: "M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z",
  search: "m21 21-4.35-4.35M10.75 18a7.25 7.25 0 1 1 0-14.5 7.25 7.25 0 0 1 0 14.5Z",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.41 1.41-.06-.06A1.7 1.7 0 0 0 16.45 18a1.7 1.7 0 0 0-1.04 1.56V20h-2v-.44A1.7 1.7 0 0 0 12.37 18a1.7 1.7 0 0 0-1.88.34l-.06.06-1.41-1.41.06-.06A1.7 1.7 0 0 0 9.42 15a1.7 1.7 0 0 0-1.56-1.04H7v-2h.86A1.7 1.7 0 0 0 9.42 11a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.41-1.41.06.06A1.7 1.7 0 0 0 12.37 8a1.7 1.7 0 0 0 1.04-1.56V6h2v.44A1.7 1.7 0 0 0 16.45 8a1.7 1.7 0 0 0 1.88-.34l.06-.06 1.41 1.41-.06.06A1.7 1.7 0 0 0 19.4 11a1.7 1.7 0 0 0 1.56 1.04H21v2h-.86A1.7 1.7 0 0 0 19.4 15Z",
  smartphone: "M7 2h10v20H7V2ZM10 18h4",
  star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2-4.5-4.4 6.2-.9L12 3Z",
  sun: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z",
  tag: "M20.59 13.41 13.4 20.6a2 2 0 0 1-2.82 0L3.4 13.41a2 2 0 0 1 0-2.82L10.59 3.4A2 2 0 0 1 12 2.82H19a2 2 0 0 1 2 2v7.01a2 2 0 0 1-.41 1.58ZM16 8h.01",
};

export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="shrink-0"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d={paths[name]} />
    </svg>
  );
}
const ITEMS = [
  "Geometry Mains Olympiad 2026",
  "Registration opens soon",
  "November 14, 2026",
  "One paper · Four problems · Four hours",
  "Open to all secondary students",
  "Second edition",
];

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-border bg-crimson py-3">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-sm font-semibold uppercase tracking-[0.2em] text-crimson-foreground"
          >
            {item}
            <span aria-hidden className="text-crimson-foreground/50">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

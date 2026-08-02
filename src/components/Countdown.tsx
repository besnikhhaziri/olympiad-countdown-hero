import { useEffect, useState } from "react";

export const CONTEST_DATE = new Date("2026-11-14T09:00:00Z");

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    done: ms === 0,
  };
}

export function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff(CONTEST_DATE));
    const id = setInterval(() => setTime(diff(CONTEST_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time?.days },
    { label: "Hours", value: time?.hours },
    { label: "Minutes", value: time?.minutes },
    { label: "Seconds", value: time?.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {units.map((u) => (
        <div
          key={u.label}
          className="rounded-xl border border-border bg-card/70 px-4 py-5 text-center backdrop-blur"
        >
          <div className="font-display text-4xl font-bold tabular-nums text-chalk sm:text-5xl">
            {u.value === undefined ? "--" : String(u.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

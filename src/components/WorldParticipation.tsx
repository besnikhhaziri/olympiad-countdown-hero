import { Suspense, lazy, useEffect, useState } from "react";
import { useTheme } from "@/lib/theme";

const WorldMap = lazy(() => import("react-svg-worldmap"));

export type MapDatum = { country: string; value: number };

export function WorldParticipation({ data }: { data: MapDatum[] }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(900);

  useEffect(() => {
    setMounted(true);
    const onResize = () => setWidth(Math.min(960, window.innerWidth - 60));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const green = theme === "green";

  if (!mounted) {
    return (
      <div className="h-[380px] w-full animate-pulse rounded-2xl border border-border bg-card" />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-2">
      <Suspense
        fallback={<div className="h-[380px] w-full animate-pulse rounded-xl bg-muted" />}
      >
        <WorldMap
          size={width}
          data={data as never}
          color={green ? "#ffffff" : "#1c4a3c"}
          borderColor={green ? "rgba(255,255,255,0.35)" : "rgba(28,74,60,0.35)"}
          backgroundColor="transparent"
          strokeOpacity={0.6}
          richInteraction
          tooltipTextFunction={({ countryName }) => `${countryName}`}
        />
      </Suspense>
    </div>
  );
}

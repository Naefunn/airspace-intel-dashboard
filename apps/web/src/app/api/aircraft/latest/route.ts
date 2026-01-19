import { prisma } from "@airspace/db";

const DEFAULT_WINDOW_MINUTES = 30;
const MAX_AIRCRAFT = 200;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const minutes = Math.max(
    1,
    Math.min(
      24 * 60,
      Number(url.searchParams.get("minutes") ?? DEFAULT_WINDOW_MINUTES)
    )
  );

  const since = new Date(Date.now() - minutes * 60 * 1000);

  const recent = await prisma.observation.findMany({
    where: { observedAt: { gte: since } },
    orderBy: { observedAt: "desc" },
    take: 5000,
    select: {
      observedAt: true,
      lat: true,
      lon: true,
      altitudeM: true,
      groundSpeedMs: true,
      ingestRunId: true,
      aircraftId: true,
      aircraft: { select: { icao24: true, callsign: true } },
    },
  });

  const seen = new Set<string>();
  const rows: Array<(typeof recent)[number]> = [];

  for (const r of recent) {
    if (seen.has(r.aircraftId)) continue;
    seen.add(r.aircraftId);
    rows.push(r);
    if (rows.length >= MAX_AIRCRAFT) break;
  }

  return Response.json({
    ok: true,
    count: rows.length,
    rows,
    windowMinutes: minutes,
  });
}

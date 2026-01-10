import { prisma } from "@airspace/db";

export async function GET() {
  const rows = await prisma.observation.findMany({
    orderBy: { observedAt: "desc" },
    take: 20,
    select: {
      observedAt: true,
      lat: true,
      lon: true,
      altitudeM: true,
      groundSpeedMs: true,
      ingestRunId: true,
      aircraft: {
        select: { icao24: true, callsign: true },
      },
    },
  });

  return Response.json({ ok: true, count: rows.length, rows });
}

import { prisma } from "@airspace/db";

export async function GET() {
  try {
    const obsCount = await prisma.observation.count();

    const latestObs = await prisma.observation.findFirst({
      orderBy: { observedAt: "desc" },
      select: {
        observedAt: true,
        aircraft: {
          select: {
            icao24: true,
            callsign: true,
          },
        },
      },
    });

    const lastRun = await prisma.ingestRun.findFirst({
      orderBy: { startedAt: "desc" },
      select: {
        id: true,
        status: true,
        startedAt: true,
        finishedAt: true,
        message: true,
      },
    });

    return Response.json({
      ok: true,
      service: "web",
      db: "connected",
      obsCount,
      latestObs,
      lastRun,
      time: new Date().toISOString(),
    });
  } catch (err) {
    return Response.json(
      {
        ok: false,
        service: "web",
        db: "error",
        error: err instanceof Error ? err.message : String(err),
        time: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

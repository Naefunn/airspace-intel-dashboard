import { prisma } from "@airspace/db";

export async function GET() {
  try {
    const pingCount = await prisma.ping.count();

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
      pingCount,
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

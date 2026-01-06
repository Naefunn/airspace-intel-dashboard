import { prisma } from "@airspace/db";

console.log("WEB DATABASE_URL:", process.env.DATABASE_URL);

export async function GET() {
  try {
    const pingCount = await prisma.ping.count();

    return Response.json({
      ok: true,
      service: "web",
      db: "connected",
      pingCount,
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

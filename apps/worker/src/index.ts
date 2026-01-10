import "dotenv/config";
import { prisma } from "@airspace/db";
import type { HealthPayload } from "@airspace/shared";

async function main() {
  const payload: HealthPayload = {
    ok: true,
    time: new Date().toISOString(),
    service: "worker",
  };

  const run = await prisma.ingestRun.create({
    data: {
      status: "RUNNING",
      message: "starting",
    },
  });

  console.log("worker alive", payload, { runId: run.id });

  try {
    // test data
    const demoIcao24 = "40621B";
    const demoCallsign = "BAW123";

    const aircraft = await prisma.aircraft.upsert({
      where: { icao24: demoIcao24 },
      update: { callsign: demoCallsign },
      create: { icao24: demoIcao24, callsign: demoCallsign },
    });

    await prisma.observation.create({
      data: {
        aircraftId: aircraft.id,
        ingestRunId: run.id,
        observedAt: new Date(),
        lat: 55.9533,
        lon: -3.1883,
        altitudeM: 1200,
        groundSpeedMs: 110,
      },
    });

    const obsCount = await prisma.observation.count();

    await prisma.ingestRun.update({
      where: { id: run.id },
      data: {
        status: "SUCCESS",
        finishedAt: new Date(),
        message: `inserted observation, total=${obsCount}`,
      },
    });

    console.log("run success", { runId: run.id, obsCount });
  } catch (err) {
    await prisma.ingestRun.update({
      where: { id: run.id },
      data: {
        status: "FAILED",
        finishedAt: new Date(),
        message: err instanceof Error ? err.message : String(err),
      },
    });

    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("worker error", err);
  process.exitCode = 1;
});

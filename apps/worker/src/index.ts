import "dotenv/config";
import type { HealthPayload } from "@airspace/shared";
import { prisma } from "@airspace/db";

async function main() {
  const payload: HealthPayload = {
    ok: true,
    time: new Date().toISOString(),
    service: "worker",
  };

  // 1) Write one row (proves worker -> DB)
  const inserted = await prisma.ping.create({
    data: { message: `worker ping @ ${payload.time}` },
  });

  // 2) Read a tiny aggregate (proves DB -> worker)
  const pingCount = await prisma.ping.count();

  console.log("worker alive", payload);
  console.log("inserted ping", {
    id: inserted.id,
    createdAt: inserted.createdAt,
  });
  console.log("pingCount", pingCount);
}

main()
  .catch((err) => {
    console.error("worker error", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

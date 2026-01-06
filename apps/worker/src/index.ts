import "dotenv/config";
import type { HealthPayload } from "@airspace/shared";

const payload: HealthPayload = {
  ok: true,
  time: new Date().toISOString(),
  service: "worker",
};

console.log("worker alive", payload);

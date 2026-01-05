import { NextResponse } from "next/server";
import type { HealthPayload } from "@airspace/shared";

export async function GET() {
  const payload: HealthPayload = {
    ok: true,
    time: new Date().toISOString(),
    service: "web",
  };
  return NextResponse.json({ payload });
}

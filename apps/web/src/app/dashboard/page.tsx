"use client";

import { useEffect, useMemo, useState } from "react";

type HealthDb = {
  ok: boolean;
  service: "web";
  db: "connected" | "error";
  obsCount?: number;
  latestObs?: {
    observedAt: string;
    aircraft: {
      icao24: string | null;
      callsign: string | null;
    } | null;
  };
  lastRun?: {
    id: string;
    status: "RUNNING" | "SUCCESS" | "FAILED";
    startedAt: string;
    finishedAt: string | null;
    message: string | null;
  } | null;
  time: string;
  error?: string;
};

type LatestObs = {
  ok: boolean;
  count: number;
  rows: Array<{
    observedAt: string;
    lat: number | null;
    lon: number | null;
    altitudeM: number | null;
    groundSpeedMs: number | null;
    ingestRunId: string | null;
    aircraft: { icao24: string | null; callsign: string | null };
  }>;
};

function formatIso(iso?: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleString();
}

function formatNumber(n?: number | null, digits = 0) {
  if (n === null || n === undefined) return "-";
  return n.toFixed(digits);
}

export default function DashboardPage() {
  const [health, setHealth] = useState<HealthDb | null>(null);
  const [obs, setObs] = useState<LatestObs | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      setError(null);
      const [hRes, oRes] = await Promise.all([
        fetch("/api/health/db", { cache: "no-store" }),
        fetch("/api/observations/latest", { cache: "no-store" }),
      ]);

      const hJson = (await hRes.json()) as HealthDb;
      const oJson = (await oRes.json()) as LatestObs;

      setHealth(hJson);
      setObs(oJson);
      setLastUpdated(new Date().toISOString());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 5000);
    return () => clearInterval(id);
  }, []);

  const statusPill = useMemo(() => {
    const dbOk = health?.ok && health.db === "connected";
    const run = health?.lastRun?.status;
    const runOk = run === "SUCCESS" || run === "RUNNING";
    const text = dbOk ? "DB connected" : "DB error";
    const sub = run ? `Ingest: ${run}` : "Ingest: -";
    const good = dbOk && runOk;
    return { text, sub, good };
  }, [health]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl p-6 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold">Airspace Intel — Dashboard</h1>
          <p className="text-zinc-400">
            Live status from{" "}
            <code className="text-zinc-200">/api/health/db</code> and{" "}
            <code className="text-zinc-200">/api/observations/latest</code>.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">System</h2>
              <span
                className={[
                  "px-2 py-1 rounded-full text-xs border",
                  statusPill.good
                    ? "border-emerald-700 text-emerald-300 bg-emerald-950/40"
                    : "border-rose-700 text-rose-300 bg-rose-950/40",
                ].join(" ")}
              >
                {statusPill.good ? "OK" : "ATTN"}
              </span>
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">DB</span>
                <span>{statusPill.text}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Ingest</span>
                <span>{statusPill.sub}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Last updated</span>
                <span>{formatIso(lastUpdated)}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={refresh}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm hover:bg-zinc-800"
              >
                Refresh now
              </button>
              <a
                href="/api/health/db"
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm hover:bg-zinc-800"
              >
                View health JSON
              </a>
            </div>
            {error ? (
              <p className="mt-3 text-sm text-rose-300">UI error: {error}</p>
            ) : null}
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <h2 className="font-medium">Latest ingest run</h2>
            <div className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Status</span>
                <span>{health?.lastRun?.status ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Started</span>
                <span>{formatIso(health?.lastRun?.startedAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Finished</span>
                <span>{formatIso(health?.lastRun?.finishedAt ?? null)}</span>
              </div>
              <div className="pt-2 text-zinc-300">
                <span className="text-zinc-400">Message: </span>
                {health?.lastRun?.message ?? "—"}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <h2 className="font-medium">Observations</h2>
            <div className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Total</span>
                <span>{health?.obsCount ?? "—"}</span>
              </div>
              <div className="pt-2">
                <div className="text-zinc-400 text-sm">Latest</div>
                <div className="mt-1 text-sm">
                  <div>
                    <span className="text-zinc-400">When: </span>
                    {formatIso(health?.latestObs?.observedAt)}
                  </div>
                  <div>
                    <span className="text-zinc-400">Aircraft: </span>
                    {(health?.latestObs?.aircraft?.callsign ||
                      health?.latestObs?.aircraft?.icao24) ??
                      "—"}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <a
                href="/api/observations/latest"
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm hover:bg-zinc-800 inline-block"
              >
                View latest JSON
              </a>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Latest observations</h2>
            <div className="text-sm text-zinc-400">
              {loading ? "Loading…" : `${obs?.count ?? 0} rows`}
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-zinc-400">
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-2 pr-4">Observed</th>
                  <th className="text-left py-2 pr-4">Aircraft</th>
                  <th className="text-left py-2 pr-4">Lat</th>
                  <th className="text-left py-2 pr-4">Lon</th>
                  <th className="text-left py-2 pr-4">Alt (m)</th>
                  <th className="text-left py-2 pr-4">GS (m/s)</th>
                  <th className="text-left py-2 pr-4">Run</th>
                </tr>
              </thead>
              <tbody>
                {(obs?.rows ?? []).map((r) => (
                  <tr
                    key={`${r.ingestRunId ?? "none"}-${r.observedAt}`}
                    className="border-b border-zinc-900"
                  >
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {formatIso(r.observedAt)}
                    </td>
                    <td className="py-2 pr-4">
                      {(r.aircraft.callsign || r.aircraft.icao24) ?? "—"}
                    </td>
                    <td className="py-2 pr-4">{formatNumber(r.lat, 4)}</td>
                    <td className="py-2 pr-4">{formatNumber(r.lon, 4)}</td>
                    <td className="py-2 pr-4">
                      {formatNumber(r.altitudeM, 0)}
                    </td>
                    <td className="py-2 pr-4">
                      {formatNumber(r.groundSpeedMs, 0)}
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs text-zinc-400">
                      {r.ingestRunId?.slice(0, 8) ?? "—"}
                    </td>
                  </tr>
                ))}
                {obs && obs.rows.length === 0 ? (
                  <tr>
                    <td className="py-6 text-zinc-400" colSpan={7}>
                      No observations yet. Run the worker:{" "}
                      <code className="text-zinc-200">npm run dev:worker</code>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

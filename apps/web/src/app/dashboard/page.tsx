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

type LatestAircraftStateResp = {
  ok: boolean;
  count: number;
  rows: Array<{
    aircraftId: string;
    observedAt: string;
    lat: number | null;
    lon: number | null;
    altitudeM: number | null;
    groundSpeedMs: number | null;
    ingestRunId: string | null;
    aircraft: { icao24: string | null; callsign: string | null };
  }>;
};

type TrackResp = {
  ok: boolean;
  count: number;
  aircraftId: string;
  windowMinutes: number;
  rows: Array<{
    id: string;
    observedAt: string;
    lat: number | null;
    lon: number | null;
    altitudeM: number | null;
    groundSpeedMs: number | null;
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
  const [obs, setObs] = useState<LatestAircraftStateResp | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedAircraftId, setSelectedAircraftId] = useState<string | null>(
    null,
  );
  const [track, setTrack] = useState<TrackResp | null>(null);

  async function refresh() {
    try {
      setError(null);
      const [hRes, oRes] = await Promise.all([
        fetch("/api/health/db", { cache: "no-store" }),
        fetch("/api/aircraft/latest", { cache: "no-store" }),
      ]);

      const hJson = (await hRes.json()) as HealthDb;
      const oJson = (await oRes.json()) as LatestAircraftStateResp;

      setHealth(hJson);
      setObs(oJson);
      setLastUpdated(new Date().toISOString());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function loadTrack(aircraftId: string) {
    const res = await fetch(`/api/aircraft/${aircraftId}/track?minutes=10`, {
      cache: "no-store",
    });
    const json = (await res.json()) as TrackResp;
    setTrack(json);
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
    <main className="min-h-screen bg-[#070A0F] text-zinc-100">
      {/* Background: subtle grid + vignette */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(34,197,94,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,10,15,0.65)_65%,rgba(7,10,15,0.92)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl p-6 space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] flex items-center justify-center">
                {/* minimalist "compass" icon */}
                <div className="relative h-5 w-5">
                  <div className="absolute inset-0 rounded-full border border-zinc-700/70" />
                  <div className="absolute left-1/2 top-1/2 h-2.5 w-0.5 -translate-x-1/2 -translate-y-full bg-zinc-200/80" />
                  <div className="absolute left-1/2 top-1/2 h-1.5 w-0.5 -translate-x-1/2 bg-sky-300/80" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Airspace Intel
                </h1>
                <p className="text-sm text-zinc-400">Operational dashboard</p>
              </div>
            </div>

            <p className="text-zinc-400 text-sm">
              Live status from{" "}
              <code className="rounded-md border border-zinc-800 bg-zinc-900/40 px-2 py-0.5 text-zinc-200">
                /api/health/db
              </code>{" "}
              and{" "}
              <code className="rounded-md border border-zinc-800 bg-zinc-900/40 px-2 py-0.5 text-zinc-200">
                /api/aircraft/latest
              </code>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-3 py-2">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                last updated
              </div>
              <div className="font-mono text-sm text-zinc-200">
                {formatIso(lastUpdated)}
              </div>
            </div>

            <button
              onClick={refresh}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm hover:bg-zinc-800/60 active:bg-zinc-800/80 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
            >
              Refresh
            </button>
            <a
              href="/api/health/db"
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm hover:bg-zinc-800/60 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
            >
              Health JSON
            </a>
          </div>
        </header>

        {error ? (
          <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4">
            <div className="text-sm text-rose-200">
              UI error: <span className="font-mono">{error}</span>
            </div>
          </div>
        ) : null}

        {/* Top cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card base styles */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  System
                </div>
                <div className="mt-1 text-lg font-medium tracking-tight">
                  Status
                </div>
              </div>

              <span
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
                  statusPill.good
                    ? "border-emerald-700/50 bg-emerald-950/30 text-emerald-200"
                    : "border-rose-700/50 bg-rose-950/30 text-rose-200",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-1.5 w-1.5 rounded-full",
                    statusPill.good ? "bg-emerald-300" : "bg-rose-300",
                  ].join(" ")}
                />
                {statusPill.good ? "NOMINAL" : "ATTENTION"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/20 p-3">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  DB link
                </div>
                <div className="mt-1 font-mono text-zinc-200">
                  {statusPill.text}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950/20 p-3">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Ingest
                </div>
                <div className="mt-1 font-mono text-zinc-200">
                  {statusPill.sub}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500">
              Pipeline
            </div>
            <div className="mt-1 text-lg font-medium tracking-tight">
              Latest ingest run
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/20 px-3 py-2">
                <span className="text-zinc-400">Status</span>
                <span className="font-mono">
                  {health?.lastRun?.status ?? "—"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/20 px-3 py-2">
                <span className="text-zinc-400">Started</span>
                <span className="font-mono">
                  {formatIso(health?.lastRun?.startedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/20 px-3 py-2">
                <span className="text-zinc-400">Finished</span>
                <span className="font-mono">
                  {formatIso(health?.lastRun?.finishedAt ?? null)}
                </span>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950/20 px-3 py-2">
                <div className="text-zinc-400 text-xs uppercase tracking-wider">
                  Message
                </div>
                <div className="mt-1 text-zinc-200">
                  {health?.lastRun?.message ?? "—"}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500">
              Telemetry
            </div>
            <div className="mt-1 text-lg font-medium tracking-tight">
              Observations
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/20 p-3">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Total
                </div>
                <div className="mt-1 font-mono text-zinc-200">
                  {health?.obsCount ?? "—"}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950/20 p-3">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Latest
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-zinc-400">When</span>
                    <span className="font-mono text-zinc-200">
                      {formatIso(health?.latestObs?.observedAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-zinc-400">Aircraft</span>
                    <span className="font-mono text-zinc-200">
                      {(health?.latestObs?.aircraft?.callsign ||
                        health?.latestObs?.aircraft?.icao24) ??
                        "—"}
                    </span>
                  </div>
                </div>
              </div>

              <a
                href="/api/observations/latest"
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm hover:bg-zinc-800/60 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
              >
                Raw observation JSON
              </a>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/25 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                Air picture
              </div>
              <h2 className="mt-1 font-medium tracking-tight">
                Latest aircraft states
              </h2>
            </div>
            <div className="text-sm text-zinc-400 font-mono">
              {loading ? "Loading…" : `${obs?.count ?? 0} rows`}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-zinc-400">
                <tr className="border-b border-zinc-800 bg-zinc-950/20">
                  <th className="text-left py-3 px-4 font-medium">Observed</th>
                  <th className="text-left py-3 px-4 font-medium">Aircraft</th>
                  <th className="text-left py-3 px-4 font-medium">Lat</th>
                  <th className="text-left py-3 px-4 font-medium">Lon</th>
                  <th className="text-left py-3 px-4 font-medium">Alt (m)</th>
                  <th className="text-left py-3 px-4 font-medium">GS (m/s)</th>
                  <th className="text-left py-3 px-4 font-medium">Run</th>
                </tr>
              </thead>

              <tbody className="font-mono">
                {(obs?.rows ?? []).map((r) => {
                  const selected = selectedAircraftId === r.aircraftId;
                  return (
                    <tr
                      key={r.aircraftId}
                      onClick={() => {
                        setSelectedAircraftId(r.aircraftId);
                        loadTrack(r.aircraftId);
                      }}
                      className={[
                        "border-b border-zinc-900/70 cursor-pointer",
                        "hover:bg-zinc-900/50",
                        selected ? "bg-zinc-900/55" : "",
                      ].join(" ")}
                    >
                      <td className="py-3 px-4 whitespace-nowrap text-zinc-200">
                        {formatIso(r.observedAt)}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={[
                              "inline-flex h-2 w-2 rounded-full",
                              selected ? "bg-sky-300" : "bg-zinc-600",
                            ].join(" ")}
                          />
                          <span className="text-zinc-200">
                            {(r.aircraft.callsign || r.aircraft.icao24) ?? "—"}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-zinc-200">
                        {formatNumber(r.lat, 4)}
                      </td>
                      <td className="py-3 px-4 text-zinc-200">
                        {formatNumber(r.lon, 4)}
                      </td>
                      <td className="py-3 px-4 text-zinc-200">
                        {formatNumber(r.altitudeM, 0)}
                      </td>
                      <td className="py-3 px-4 text-zinc-200">
                        {formatNumber(r.groundSpeedMs, 0)}
                      </td>
                      <td className="py-3 px-4 text-xs text-zinc-400">
                        {r.ingestRunId?.slice(0, 8) ?? "—"}
                      </td>
                    </tr>
                  );
                })}

                {obs && obs.rows.length === 0 ? (
                  <tr>
                    <td
                      className="py-10 px-4 text-zinc-400 font-sans"
                      colSpan={7}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="text-sm">No observations yet.</div>
                        <div className="text-sm">
                          Run the worker:{" "}
                          <code className="rounded-md border border-zinc-800 bg-zinc-950/20 px-2 py-0.5 text-zinc-200">
                            npm run dev:worker
                          </code>
                        </div>
                      </div>
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

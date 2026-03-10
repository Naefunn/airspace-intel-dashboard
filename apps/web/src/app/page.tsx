export default function Home() {
  return (
    <main className="min-h-screen bg-[#070A0F] text-zinc-100">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(34,197,94,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,10,15,0.65)_65%,rgba(7,10,15,0.92)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6">
        <header className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/25 px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/40">
              <div className="relative h-5 w-5">
                <div className="absolute inset-0 rounded-full border border-zinc-700/70" />
                <div className="absolute left-1/2 top-1/2 h-2.5 w-0.5 -translate-x-1/2 -translate-y-full bg-zinc-200/80" />
                <div className="absolute left-1/2 top-1/2 h-1.5 w-0.5 -translate-x-1/2 bg-sky-300/80" />
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold tracking-wide text-zinc-100">
                Airspace Intel
              </div>
              <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                Operational awareness platform
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
            <a href="#capabilities" className="hover:text-zinc-200">
              Capabilities
            </a>
            <a href="#how-it-works" className="hover:text-zinc-200">
              How it works
            </a>
            <a href="#overview" className="hover:text-zinc-200">
              Overview
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/dashboard"
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60"
            >
              Open dashboard
            </a>
          </div>
        </header>

        <section className="grid flex-1 grid-cols-1 gap-8 py-10 lg:grid-cols-2 lg:items-center lg:py-16">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-900/40 bg-sky-950/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-sky-200">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              Live telemetry and air picture
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-zinc-50 md:text-5xl">
              A clean airspace intelligence interface for tracking live aircraft
              activity and ingest health.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              Airspace Intel provides a focused operational view of aircraft
              observations, ingest pipeline status, and recent state data in one
              streamlined interface built for monitoring, analysis, and future
              expansion.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/dashboard"
                className="rounded-xl border border-sky-800/50 bg-sky-950/30 px-5 py-3 text-sm font-medium text-sky-100 hover:bg-sky-900/30"
              >
                Launch dashboard
              </a>
              <a
                href="#overview"
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-zinc-800/60"
              >
                View platform overview
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  Telemetry
                </div>
                <div className="mt-2 text-2xl font-semibold text-zinc-100">
                  Live
                </div>
                <p className="mt-1 text-sm text-zinc-400">
                  Recent aircraft state data surfaced in a single operational
                  view.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  Ingest
                </div>
                <div className="mt-2 text-2xl font-semibold text-zinc-100">
                  Monitored
                </div>
                <p className="mt-1 text-sm text-zinc-400">
                  Visibility into worker runs, completion state, and pipeline
                  health.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  Platform
                </div>
                <div className="mt-2 text-2xl font-semibold text-zinc-100">
                  Expandable
                </div>
                <p className="mt-1 text-sm text-zinc-400">
                  Designed as a base for mapping, tracks, alerts, and
                  intelligence workflows.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/30 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
              <div className="rounded-2xl border border-zinc-800 bg-[#05080D] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                      Operational preview
                    </div>
                    <div className="mt-1 text-sm font-medium text-zinc-200">
                      Air picture snapshot
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-800/40 bg-emerald-950/20 px-3 py-1 text-xs text-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    Nominal
                  </span>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                  <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
                  <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-900/30" />
                  <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-900/20" />
                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-900/20" />
                  <div className="absolute left-1/2 top-1/2 h-px w-full -translate-y-1/2 bg-zinc-800" />
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-zinc-800" />

                  {/* fake tracks / blips */}
                  <div className="relative h-90]">
                    <div className="absolute left-[28%] top-[32%] h-3 w-3 rounded-full border border-sky-300/40 bg-sky-300/80 shadow-[0_0_24px_rgba(125,211,252,0.6)]" />
                    <div className="absolute left-[62%] top-[25%] h-3 w-3 rounded-full border border-emerald-300/40 bg-emerald-300/80 shadow-[0_0_24px_rgba(134,239,172,0.5)]" />
                    <div className="absolute left-[54%] top-[60%] h-3 w-3 rounded-full border border-zinc-300/30 bg-zinc-300/70 shadow-[0_0_16px_rgba(255,255,255,0.25)]" />
                    <div className="absolute left-[38%] top-[68%] h-3 w-3 rounded-full border border-sky-300/40 bg-sky-300/80 shadow-[0_0_24px_rgba(125,211,252,0.5)]" />

                    <div className="absolute left-[28%] top-[32%] h-16 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-500/10" />
                    <div className="absolute left-[62%] top-[25%] h-20 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10" />

                    <div className="absolute right-4 top-4 w-44 rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 backdrop-blur">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                        Track focus
                      </div>
                      <div className="mt-2 space-y-2 text-xs font-mono text-zinc-300">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Callsign</span>
                          <span>BAW742</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Altitude</span>
                          <span>11280 m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">GS</span>
                          <span>231 m/s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Status</span>
                          <span className="text-emerald-300">TRACKING</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3">
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 backdrop-blur">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                          Feed
                        </div>
                        <div className="mt-1 text-sm font-medium text-zinc-200">
                          Connected
                        </div>
                      </div>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 backdrop-blur">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                          Run state
                        </div>
                        <div className="mt-1 text-sm font-medium text-zinc-200">
                          Success
                        </div>
                      </div>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 backdrop-blur">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                          Coverage
                        </div>
                        <div className="mt-1 text-sm font-medium text-zinc-200">
                          Active
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -left-6 top-10 h-24 w-24 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-6 bottom-10 h-24 w-24 rounded-full bg-emerald-500/10 blur-3xl" />
          </div>
        </section>

        <section id="capabilities" className="py-6">
          <div className="mb-6">
            <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              Capabilities
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100">
              Core platform functions
            </h2>
            <p className="mt-2 max-w-3xl text-zinc-400">
              The current platform is focused on reliable visibility first:
              health, ingest state, latest aircraft observations, and a clean
              operator-facing dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-5">
              <div className="text-sm font-medium text-zinc-100">
                System health visibility
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Track whether the platform is up, whether the database is
                connected, and whether ingest activity is succeeding or failing.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-5">
              <div className="text-sm font-medium text-zinc-100">
                Latest aircraft state monitoring
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Review the newest observed aircraft states including time,
                callsign, coordinates, altitude, and ground speed.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-5">
              <div className="text-sm font-medium text-zinc-100">
                Foundation for expansion
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Extend the system into mapping, track history, anomaly
                detection, alerting, and richer operational workflows over time.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-6">
          <div className="mb-6">
            <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              How it works
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100">
              Simple pipeline, clear operator view
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-5">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/60 text-sm font-semibold text-zinc-200">
                1
              </div>
              <div className="text-sm font-medium text-zinc-100">Ingest</div>
              <p className="mt-2 text-sm text-zinc-400">
                Worker processes collect aircraft observation data and record
                run status for visibility and troubleshooting.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-5">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/60 text-sm font-semibold text-zinc-200">
                2
              </div>
              <div className="text-sm font-medium text-zinc-100">Store</div>
              <p className="mt-2 text-sm text-zinc-400">
                The application persists observations and run metadata, giving a
                reliable base for querying latest states and track windows.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/25 p-5">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/60 text-sm font-semibold text-zinc-200">
                3
              </div>
              <div className="text-sm font-medium text-zinc-100">Surface</div>
              <p className="mt-2 text-sm text-zinc-400">
                The dashboard presents operational status and aircraft state in
                a fast, readable interface built for monitoring first.
              </p>
            </div>
          </div>
        </section>

        <section id="overview" className="py-6 pb-10">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/25 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur md:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  Platform overview
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
                  Built as the starting point for a broader airspace
                  intelligence product.
                </h2>
                <p className="mt-4 max-w-2xl text-zinc-400">
                  Today the focus is clarity, reliability, and operator-friendly
                  visibility. Tomorrow it can grow into map-based air picture
                  tooling, alerting, trajectory views, intelligence workflows,
                  and richer analysis features.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/dashboard"
                    className="rounded-xl border border-sky-800/50 bg-sky-950/30 px-5 py-3 text-sm font-medium text-sky-100 hover:bg-sky-900/30"
                  >
                    Enter dashboard
                  </a>
                  <a
                    href="/api/health/db"
                    className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-zinc-800/60"
                  >
                    View API health
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/30 p-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                    Use case
                  </div>
                  <div className="mt-1 text-sm font-medium text-zinc-200">
                    Monitoring live aircraft activity
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/30 p-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                    Current focus
                  </div>
                  <div className="mt-1 text-sm font-medium text-zinc-200">
                    Health, ingest, observations, track visibility
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/30 p-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                    Direction
                  </div>
                  <div className="mt-1 text-sm font-medium text-zinc-200">
                    Air picture, alerting, intelligence workflows
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-zinc-900 py-6 text-sm text-zinc-500">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>Airspace Intel</p>
            <div className="flex items-center gap-4">
              <a href="/dashboard" className="hover:text-zinc-300">
                Dashboard
              </a>
              <a href="/api/health/db" className="hover:text-zinc-300">
                Health API
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

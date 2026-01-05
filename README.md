# Airspace Intelligence Dashboard

A work-in-progress project focused on building a real-world airspace monitoring dashboard using modern web tooling, background processing, and clear, explainable logic.

The aim is not to simulate air traffic control, but to explore **situational awareness software**: ingesting live aircraft data, visualising it clearly, detecting noteworthy situations using deterministic rules, and presenting that information in a way a human can reason about.

This project is being built incrementally, with an emphasis on clarity, separation of concerns, and realistic engineering decisions.

---

## Why this project exists

I wanted a single, substantial project that:

- Goes beyond a typical CRUD or “todo list” app
- Uses real-world data and real constraints
- Demonstrates full-stack development, background processing, and shared code
- Leaves room to grow into more advanced topics over time

Aviation and systems-oriented software is a personal interest of mine, and airspace monitoring provides a good domain for exploring these ideas without building something unsafe or unrealistic.

---

## What it does (current state)

At the current stage, the project includes:

- A Next.js web application running locally
- A background worker service running locally
- A shared TypeScript package used by both services
- A simple health API endpoint for sanity-checking the system

The web application and worker are intentionally kept separate:

- The web app handles UI and API routes
- The worker is intended for polling external data sources and processing data independently

This mirrors how many real-world systems are structured.

---

## Planned direction

As development continues, the project will expand to include:

- Ingestion of real-world air traffic data (Scotland-focused initially - where i am based)
- Visualisation of aircraft tracks in a radar-style view
- Deterministic detection rules (e.g. sector entry, altitude change, proximity)
- Explainable incident summaries designed to support human decision-making
- A database layer for storing time-series aircraft state

Each of these will be added incrementally.

---

## Monorepo layout

    apps/
      web/        Next.js dashboard and API routes
      worker/     Background worker (data ingestion etc)
    packages/
      shared/     Shared types and utilities
      db/         Database layer (Prisma) – coming next
    docs/         Architecture notes and design decisions

---

## Running locally

Install dependencies:

    npm install

Run the web application:

    npm run dev

Run the worker (in a separate terminal):

    npm run dev:worker

Health check endpoint:

    http://localhost:3000/api/health

---

## Notes

This repository reflects an active learning and building process.  
Trade-offs, assumptions, and design decisions will be documented as the project evolves.

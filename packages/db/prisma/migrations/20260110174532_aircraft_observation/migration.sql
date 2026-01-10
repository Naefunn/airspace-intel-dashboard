-- CreateTable
CREATE TABLE "Aircraft" (
    "id" TEXT NOT NULL,
    "icao24" TEXT,
    "callsign" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Observation" (
    "id" TEXT NOT NULL,
    "observedAt" TIMESTAMP(3) NOT NULL,
    "lat" DOUBLE PRECISION,
    "lon" DOUBLE PRECISION,
    "altitudeM" DOUBLE PRECISION,
    "groundSpeedMs" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aircraftId" TEXT NOT NULL,
    "ingestRunId" TEXT,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_icao24_key" ON "Aircraft"("icao24");

-- CreateIndex
CREATE INDEX "Observation_observedAt_idx" ON "Observation"("observedAt");

-- CreateIndex
CREATE INDEX "Observation_aircraftId_observedAt_idx" ON "Observation"("aircraftId", "observedAt");

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_ingestRunId_fkey" FOREIGN KEY ("ingestRunId") REFERENCES "IngestRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

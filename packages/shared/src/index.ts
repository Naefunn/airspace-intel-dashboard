export type HealthPayload = {
  ok: boolean;
  time: string;
  service: "web" | "worker";
};

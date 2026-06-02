declare module "../database/routes" {
  export function getRoutes(): Promise<{
    data: Array<Record<string, unknown>> | null;
    error: unknown;
  }>;
}

export function getAppBaseUrl(): string {
  return (
    process.env.APP_URL ||
    process.env.BETTER_AUTH_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://subvima.dev")
  );
}

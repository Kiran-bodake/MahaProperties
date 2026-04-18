type Level = "info" | "warn" | "error" | "debug";
const isDev = process.env.NODE_ENV === "development";

function log(level: Level, msg: string, data?: unknown) {
  if (!isDev && level === "debug") return;
  const ts = new Date().toISOString();
  const fn = level === "error" ? console.error : level === "warn" ? console.warn : console.log;
  fn(`[PropVista][${ts}][${level.toUpperCase()}]`, msg, data ?? "");
}

export const logger = {
  info:  (m: string, d?: unknown) => log("info",  m, d),
  warn:  (m: string, d?: unknown) => log("warn",  m, d),
  error: (m: string, d?: unknown) => log("error", m, d),
  debug: (m: string, d?: unknown) => log("debug", m, d),
};

// ─── PUBLIC LAYOUT ───────────────────────────────────────────────────────────
// Navbar, Footer, and WhatsApp widget all live inside the HomePage component.
// This layout is a lightweight wrapper for shared UI features.
// ─────────────────────────────────────────────────────────────────────────────
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

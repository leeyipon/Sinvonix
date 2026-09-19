"use client";

/**
 * Global error boundary (last resort — replaces the root layout when it throws).
 * Also ensures Turbopack includes the global-error module in the client manifest.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#060815",
          color: "#f1f5f9",
          margin: 0,
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: 460 }}>
          <p style={{ fontSize: 14, letterSpacing: 2, color: "#818cf8" }}>ERROR</p>
          <h1 style={{ fontSize: 28, margin: "12px 0" }}>Something went wrong</h1>
          <p style={{ color: "#94a3b8", marginBottom: 24 }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: 999,
              padding: "10px 22px",
              color: "#fff",
              background: "linear-gradient(100deg,#2563eb,#7c3aed)",
              fontSize: 14,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

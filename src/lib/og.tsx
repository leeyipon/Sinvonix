import { ImageResponse } from "next/og";

/** Shared config for every route's opengraph-image. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type OgProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

/**
 * A branded 1200×630 social card — deep navy ground with the real Sinvonix
 * shield mark and brand-blue accent, built with next/og (satori). Inline
 * flex styles only; no Tailwind, no webfonts.
 */
export function ogImage({ eyebrow = "Sinvonix", title, subtitle }: OgProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#021529",
          color: "#FAFAFA",
          padding: 76,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* ambient brand-blue glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(42,140,239,0.30), rgba(42,140,239,0))",
            display: "flex",
          }}
        />

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: "linear-gradient(135deg,#2A8CEF,#013A74)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="27" viewBox="0 0 88 100" fill="none">
              <path
                d="M18 24 Q18 20 22 20 L66 20 Q70 20 70 24 L70 52 Q70 74 44 90 Q18 74 18 52 Z"
                fill="none"
                stroke="#fff"
                strokeWidth="8"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>Sinvonix</div>
        </div>

        {/* headline block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              color: "#72B2F3",
              fontSize: 24,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: "#A6A6AB",
                lineHeight: 1.35,
                maxWidth: 920,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#A6A6AB",
          }}
        >
          <div style={{ display: "flex", fontWeight: 600, color: "#FAFAFA" }}>sinvonix.com</div>
          <div style={{ display: "flex" }}>Fraud · Payments · Contact Centre · AI · Security</div>
        </div>

        {/* brand-blue base bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 12,
            background: "linear-gradient(90deg,#2A8CEF,#0152A5,#013A74)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...OG_SIZE }
  );
}

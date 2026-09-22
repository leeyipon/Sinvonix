import { ImageResponse } from "next/og";

/** iOS home-screen icon — full bleed, no corner rounding (iOS applies its
 *  own squircle mask). Same shield as icon.tsx, with room at this size for
 *  the network-mark detail too. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#2A8CEF,#012D5A)",
        }}
      >
        <svg width="108" height="123" viewBox="0 0 88 100" fill="none">
          <path
            d="M18 24 Q18 20 22 20 L66 20 Q70 20 70 24 L70 52 Q70 74 44 90 Q18 74 18 52 Z"
            fill="none"
            stroke="#fff"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path
            d="M25 27.5 Q25 25.5 27 25.5 L61 25.5 Q63 25.5 63 27.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path d="M56 40 L31 52 L48 68 Z" fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
          <circle cx="31" cy="52" r="5" fill="#fff" />
          <circle cx="48" cy="68" r="5" fill="#fff" />
          <circle cx="56" cy="40" r="8" fill="#fff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

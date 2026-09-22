import { ImageResponse } from "next/og";

/** Browser tab / bookmark favicon — the real Sinvonix shield, not a generic
 *  letter tile. At this size the inner network-mark dots would be noise,
 *  so it's simplified to the shield silhouette alone. */
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#2A8CEF,#013A74)",
          borderRadius: 10,
        }}
      >
        <svg width="30" height="34" viewBox="0 0 88 100" fill="none">
          <path
            d="M18 24 Q18 20 22 20 L66 20 Q70 20 70 24 L70 52 Q70 74 44 90 Q18 74 18 52 Z"
            fill="none"
            stroke="#fff"
            strokeWidth="7"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}

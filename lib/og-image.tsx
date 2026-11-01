import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogImageSize = { width: 1200, height: 630 };

type OgImageProps = {
  eyebrow: string;
  title: string;
  footer: string;
};

/** Shared social card layout for the home page and every project page. */
export function renderOgImage({ eyebrow, title, footer }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0d0c",
          color: "#e8ecea",
          padding: "72px 80px",
          borderTop: "6px solid #4fd1a5",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9ba5a0" }}>
          <span>{site.name}</span>
          <span style={{ color: "#4fd1a5" }}>{eyebrow}</span>
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2, maxWidth: 980 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9ba5a0" }}>{footer}</div>
      </div>
    ),
    ogImageSize,
  );
}

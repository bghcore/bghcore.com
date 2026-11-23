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
          background: "#f6f1e7",
          color: "#211e19",
          padding: "72px 80px",
          borderTop: "6px solid #9b2c1b",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#595346" }}>
          <span>{site.name}</span>
          <span style={{ color: "#9b2c1b" }}>{eyebrow}</span>
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2, maxWidth: 980 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#595346" }}>{footer}</div>
      </div>
    ),
    ogImageSize,
  );
}

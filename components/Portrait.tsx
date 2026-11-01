import { site } from "@/lib/site";

type PortraitProps = {
  className?: string;
  /** Rendered width hint for the browser, for example "(min-width: 1024px) 18rem, 60vw". */
  sizes: string;
  priority?: boolean;
  /** "square" crops the 4:5 photo to 1:1 around its center, which keeps the face in frame. */
  shape?: "portrait" | "square";
};

function portraitSrcSet(format: "avif" | "webp") {
  return site.portrait.widths.map((width) => `/bradley-hanson-${width}.${format} ${width}w`).join(", ");
}

// A plain <picture> instead of next/image: the static export can't run the image optimizer,
// so the AVIF and WebP sizes are generated ahead of time and the browser picks one.
export function Portrait({ className = "", sizes, priority = false, shape = "portrait" }: PortraitProps) {
  const aspect = shape === "square" ? "aspect-square" : "aspect-[4/5]";
  return (
    <picture>
      <source type="image/avif" srcSet={portraitSrcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={portraitSrcSet("webp")} sizes={sizes} />
      <img
        src={site.portrait.src}
        width={site.portrait.width}
        height={site.portrait.height}
        alt={site.portrait.alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`${aspect} h-auto w-full rounded-md border border-line bg-raised object-cover ${className}`}
      />
    </picture>
  );
}

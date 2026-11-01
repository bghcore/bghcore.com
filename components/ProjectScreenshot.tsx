import type { ProjectImage } from "@/lib/content/projects";

type ProjectScreenshotProps = {
  image: ProjectImage;
  /** Rendered width hint for the browser, for example "(min-width: 1024px) 40rem, 100vw". */
  sizes: string;
  priority?: boolean;
  /** Thumbnails next to a text link repeat what the link says, so they get empty alt text. */
  decorative?: boolean;
  className?: string;
};

function screenshotSrcSet(file: string, format: "avif" | "webp") {
  return [640, 1280].map((width) => `/projects/${file}-${width}.${format} ${width}w`).join(", ");
}

// Same approach as Portrait: the static export can't optimize images at request time, so each
// screenshot ships prebuilt AVIF and WebP sizes and the browser picks one.
export function ProjectScreenshot({ image, sizes, priority = false, decorative = false, className = "" }: ProjectScreenshotProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={screenshotSrcSet(image.file, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={screenshotSrcSet(image.file, "webp")} sizes={sizes} />
      <img
        src={`/projects/${image.file}.jpg`}
        width={1280}
        height={720}
        alt={decorative ? "" : image.alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`aspect-video h-auto w-full rounded-md border border-line bg-raised object-cover object-top ${className}`}
      />
    </picture>
  );
}

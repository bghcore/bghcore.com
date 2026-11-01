import Image from "next/image";
import { site } from "@/lib/site";

type PortraitProps = {
  className?: string;
  /** Rendered width hint for the browser, for example "(min-width: 1024px) 18rem, 60vw". */
  sizes: string;
  priority?: boolean;
};

export function Portrait({ className = "", sizes, priority = false }: PortraitProps) {
  return (
    <Image
      src={site.portrait.src}
      width={site.portrait.width}
      height={site.portrait.height}
      alt={site.portrait.alt}
      sizes={sizes}
      priority={priority}
      className={`aspect-[4/5] h-auto w-full rounded-md border border-line bg-raised object-cover ${className}`}
    />
  );
}

import { Link } from "@tanstack/react-router";
import { PHOTOS, type PhotoId } from "@/data/credits";

export function PhotoBand({
  id,
  caption,
  aspect = "aspect-[21/9]",
  position = "object-center",
}: {
  id: PhotoId;
  caption?: string;
  aspect?: string;
  position?: string;
}) {
  const photo = PHOTOS[id];
  return (
    <section className="pt-12 sm:pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <figure>
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
            className={`w-full ${aspect} ${position} object-cover rounded-2xl border border-border`}
          />
          <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>{caption}</span>
            <span>
              Photo: {photo.author}, {photo.license.split(" (")[0]}.{" "}
              <Link to="/credits" className="underline hover:text-foreground">
                Credits
              </Link>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

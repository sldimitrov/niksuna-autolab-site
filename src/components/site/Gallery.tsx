import { useEffect, useState } from "react";
import { X } from "lucide-react";

import galleryTint from "@/assets/gallery-tint.jpg";
import galleryPpf from "@/assets/gallery-ppf.jpg";
import galleryHeadliner from "@/assets/gallery-headliner.jpg";
import galleryDoor from "@/assets/gallery-door.jpg";
import gallerySpeaker from "@/assets/gallery-speaker.jpg";
import galleryCarRear from "@/assets/gallery-car-rear.jpg";
import galleryPolish from "@/assets/gallery-polish.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";

// Placeholder gallery slots — swap `src` with real project photos.
// `tag` supports before/after style pairs (e.g. "Before" / "After").
const shots = [
  { src: galleryHeadliner, alt: "Re-wrapped car headliner in black suede", tag: "Before" },
  { src: galleryDoor, alt: "Door panel re-wrapped with red stitching", tag: "After" },
  { src: gallerySpeaker, alt: "Speaker trim wrapped in leather", tag: "Detail" },
  { src: galleryTint, alt: "Window tint film being applied to car glass", tag: "Before" },
  { src: galleryCarRear, alt: "Black car with fully tinted rear windows", tag: "After" },
  { src: galleryPpf, alt: "PPF film applied over a car headlight", tag: "PPF" },
  { src: galleryPolish, alt: "Paint correction with a machine polisher", tag: "Before" },
  { src: galleryInterior, alt: "Finished dark car interior with red ambient light", tag: "After" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="portfolio" className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="claw-rule text-3xl sm:text-4xl">Our Work</h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          A look at recent builds from the shop — interiors, film and glass. Tap any photo to
          enlarge.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {shots.map((shot, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Enlarge photo: ${shot.alt}`}
              className="group relative aspect-square overflow-hidden rounded-sm border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={shot.src}
                alt={shot.alt}
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-2 left-2 rounded-sm bg-background/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {shot.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 rounded-sm border border-border p-2 text-foreground"
            onClick={() => setActive(null)}
          >
            <X size={18} />
          </button>
          <img
            src={shots[active]!.src}
            alt={shots[active]!.alt}
            width={1024}
            height={1024}
            className="max-h-[85vh] w-auto max-w-full rounded-sm object-contain"
          />
        </div>
      )}
    </section>
  );
}

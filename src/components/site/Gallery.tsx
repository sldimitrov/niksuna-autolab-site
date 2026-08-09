import { useEffect, useState } from "react";
import { X } from "lucide-react";

// Real shop photos, served via Lovable Assets pointers.
import work1 from "@/assets/work-1.png.asset.json";
import work2 from "@/assets/work-2.png.asset.json";
import work3 from "@/assets/work-3.png.asset.json";
import work4 from "@/assets/work-4.png.asset.json";
import work5 from "@/assets/work-5.png.asset.json";
import work6 from "@/assets/work-6.png.asset.json";
import work7 from "@/assets/work-7.png.asset.json";

// Слотове за галерия — сменяйте с нови снимки при нужда.
const shots = [
  { src: work1.url, alt: "Бял VW Tiguan с фолирани стъкла", tag: "Фолиране" },
  { src: work2.url, alt: "BMW 7 с демонтиран таван за претапициране", tag: "Преди" },
  { src: work7.url, alt: "VW Golf с тъмно фолирани стъкла в бокса", tag: "След" },
  { src: work3.url, alt: "Интериор на Mercedes AMG след обработка", tag: "Интериор" },
  { src: work4.url, alt: "Audi TT с фолирани стъкла", tag: "Фолиране" },
  { src: work5.url, alt: "Audi A3 с изваден таван преди претапициране", tag: "Преди" },
  { src: work6.url, alt: "VW Tiguan с фолирани стъкла след обработка", tag: "След" },
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
        <h2 className="claw-rule text-3xl sm:text-4xl">Наши проекти</h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Част от последните ни автомобили — интериор, фолио и стъкла. Натиснете снимка за
          увеличение.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {shots.map((shot, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Увеличи снимка: ${shot.alt}`}
              className="group relative aspect-square overflow-hidden rounded-sm border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={shot.src}
                alt={shot.alt}
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
            aria-label="Затвори"
            className="absolute right-4 top-4 rounded-sm border border-border p-2 text-foreground"
            onClick={() => setActive(null)}
          >
            <X size={18} />
          </button>
          <img
            src={shots[active]!.src}
            alt={shots[active]!.alt}
            className="max-h-[85vh] w-auto max-w-full rounded-sm object-contain"
          />
        </div>
      )}
    </section>
  );
}

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Phone, X } from "lucide-react";

// Real shop photos, served via Lovable Assets pointers.
import work1 from "@/assets/work-1.png.asset.json";
import work2 from "@/assets/work-2.png.asset.json";
import work3 from "@/assets/work-3.png.asset.json";
import work4 from "@/assets/work-4.png.asset.json";
import work5 from "@/assets/work-5.png.asset.json";
import work6 from "@/assets/work-6.png.asset.json";
import work7 from "@/assets/work-7.png.asset.json";
import tapi1 from "@/assets/tapi-1.jpg.asset.json";
import tapi2 from "@/assets/tapi-2.jpg.asset.json";
import tapi3 from "@/assets/tapi-3.jpg.asset.json";
import tapi4 from "@/assets/tapi-4.jpg.asset.json";
import tapi5 from "@/assets/tapi-5.jpg.asset.json";
import tapi6 from "@/assets/tapi-6.jpg.asset.json";
import tapi7 from "@/assets/tapi-7.jpg.asset.json";
import tapi8 from "@/assets/tapi-8.jpg.asset.json";
import tapi9 from "@/assets/tapi-9.jpg.asset.json";
import tapi10 from "@/assets/tapi-10.jpg.asset.json";

import { PHONE_TEL } from "./ContactSection";

type Shot = { src: string; alt: string; tag: string };

const upholstery: Shot[] = [
  { src: tapi10.url, alt: "Черен таван и интериорни части след претапициране с велур", tag: "Претапициране" },
  { src: tapi9.url, alt: "Оригинален бежов таван и интериорни части преди претапициране", tag: "Преди" },
  { src: tapi1.url, alt: "Претапициран таван на Audi в черен велур", tag: "Претапициране" },
  { src: tapi2.url, alt: "Таван, претапициран в бордо велур", tag: "Претапициране" },
  { src: tapi3.url, alt: "Претапициран таван на VW Passat в черен велур", tag: "Претапициране" },
  { src: tapi4.url, alt: "Детайл от претапициран таван със сенници и плафон", tag: "Детайл" },
  { src: tapi5.url, alt: "Близък план на велурена материя на автотаван", tag: "Детайл" },
  { src: tapi6.url, alt: "Претапицирани сенници в бежов велур", tag: "Сенници" },
  { src: tapi7.url, alt: "Претапициран таван и колонки в Mercedes отвътре", tag: "Интериор" },
  { src: tapi8.url, alt: "Претапициран таван на Audi, монтиран в автомобила", tag: "Интериор" },
];

const filmwork: Shot[] = [
  { src: work1.url, alt: "Бял VW Tiguan с фолирани стъкла", tag: "Фолиране" },
  { src: work2.url, alt: "BMW 7 с демонтиран таван за претапициране", tag: "Преди" },
  { src: work7.url, alt: "VW Golf с тъмно фолирани стъкла в бокса", tag: "След" },
  { src: work3.url, alt: "Интериор на Mercedes AMG след обработка", tag: "Интериор" },
  { src: work4.url, alt: "Audi TT с фолирани стъкла", tag: "Фолиране" },
  { src: work5.url, alt: "Audi A3 с изваден таван преди претапициране", tag: "Преди" },
  { src: work6.url, alt: "VW Tiguan с фолирани стъкла след обработка", tag: "След" },
];

const shots: Shot[] = [...upholstery, ...filmwork];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => ((i ?? 0) + 1) % shots.length);
      if (e.key === "ArrowLeft") setActive((i) => ((i ?? 0) - 1 + shots.length) % shots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="portfolio" className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="claw-rule text-3xl sm:text-4xl">Наши проекти</h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Част от последните ни автомобили — претапициране на тавани и интериорни части, фолио и
          стъкла. Натиснете снимка за увеличение.
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

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="btn-red rounded-sm px-7 py-3.5 text-sm font-semibold uppercase tracking-widest"
          >
            Свържете се с нас
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 rounded-sm border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-widest hover:border-primary hover:text-primary"
          >
            <Phone size={16} /> {"Обади се"}
          </a>
        </div>
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Преглед на снимка"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-background/95 p-4"
        >
          <button
            type="button"
            aria-label="Затвори"
            className="absolute right-4 top-4 rounded-sm border border-border p-2 text-foreground hover:border-primary hover:text-primary"
            onClick={() => setActive(null)}
          >
            <X size={18} />
          </button>

          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={shots[active]!.src}
              alt={shots[active]!.alt}
              className="mx-auto max-h-[62vh] w-auto max-w-full rounded-sm object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Предишна снимка"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => ((i ?? 0) - 1 + shots.length) % shots.length);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-card/90 p-2.5 hover:border-primary hover:text-primary"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Следваща снимка"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => ((i ?? 0) + 1) % shots.length);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-card/90 p-2.5 hover:border-primary hover:text-primary"
          >
            <ChevronRight size={20} />
          </button>

          <div
            className="flex w-full max-w-4xl flex-col items-center gap-3 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-muted-foreground">{shots[active]!.alt}</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {active + 1} / {shots.length}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                onClick={() => setActive(null)}
                className="btn-red rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-widest"
              >
                Искам същото
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:border-primary hover:text-primary"
              >
                <Phone size={14} /> Обади се
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

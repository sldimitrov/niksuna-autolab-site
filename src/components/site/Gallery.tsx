import { useEffect, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Phone, X } from "lucide-react";

import { categories, categoryById, type CategoryId, galleryQueryOptions } from "@/data/gallery";

import { PHONE_TEL } from "./ContactSection";

const INITIAL_VISIBLE = 12;

export function Gallery() {
  const { data: shots } = useSuspenseQuery(galleryQueryOptions());
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = useMemo(
    () => (filter === "all" ? shots : shots.filter((s) => s.categoryId === filter)),
    [filter, shots],
  );

  const displayed = showAll ? visible : visible.slice(0, INITIAL_VISIBLE);
  const hiddenCount = visible.length - displayed.length;

  useEffect(() => {
    setActive(null);
    setShowAll(false);
  }, [filter]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => ((i ?? 0) + 1) % visible.length);
      if (e.key === "ArrowLeft") setActive((i) => ((i ?? 0) - 1 + visible.length) % visible.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, visible.length]);

  const activeCategory = filter === "all" ? null : categoryById.get(filter)!;

  return (
    <section id="portfolio" className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="claw-rule text-3xl sm:text-4xl">Наши проекти</h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Разгледайте завършени автомобили по услуга - претапициране на тавани, фолиране на стъкла и
          още. Натиснете снимка за увеличение.
        </p>

        {/* КАТЕГОРИИ */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`inline-flex min-h-11 items-center gap-2 rounded-sm border px-4 text-sm font-semibold uppercase tracking-widest transition-colors ${
              filter === "all"
                ? "btn-red border-transparent"
                : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
            }`}
          >
            Всички
          </button>
          {categories.map((c) => {
            const count = shots.filter((s) => s.categoryId === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-sm border px-4 text-sm font-semibold uppercase tracking-widest transition-colors ${
                  filter === c.id
                    ? "btn-red border-transparent"
                    : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                <c.icon size={16} className="shrink-0" />
                {c.label}
                {count > 0 && (
                  <span className="text-xs font-normal normal-case tracking-normal opacity-70">
                    ({count})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {visible.length > 0 ? (
          <>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
              {displayed.map((shot, i) => {
                const cat = categoryById.get(shot.categoryId)!;
                return (
                  <button
                    key={shot.src}
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
                    <span
                      title={cat.label}
                      className="btn-red absolute left-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full"
                    >
                      <cat.icon size={15} />
                    </span>
                  </button>
                );
              })}
            </div>

            {visible.length > INITIAL_VISIBLE && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border px-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                >
                  {showAll ? (
                    <>
                      <ChevronUp size={16} /> Покажи по-малко
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} /> Покажи още ({hiddenCount})
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-4 rounded-sm border border-dashed border-border px-6 py-16 text-center">
            {activeCategory && (
              <span className="btn-red inline-flex h-12 w-12 items-center justify-center rounded-full">
                <activeCategory.icon size={22} />
              </span>
            )}
            <p className="max-w-sm text-sm text-muted-foreground">
              Очаквайте скоро снимки от завършени проекти в тази категория. Междувременно се
              свържете с нас за подробности и примери.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="btn-red inline-flex min-h-11 items-center rounded-sm px-7 text-sm font-semibold uppercase tracking-widest"
          >
            Свържете се с нас
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border px-7 text-sm font-semibold uppercase tracking-widest hover:border-primary hover:text-primary"
          >
            <Phone size={16} /> {"Обади се"}
          </a>
        </div>
      </div>

      {active !== null && visible[active] && (
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
            className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-foreground hover:border-primary hover:text-primary"
            onClick={() => setActive(null)}
          >
            <X size={20} />
          </button>

          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={visible[active]!.src}
              alt={visible[active]!.alt}
              className="mx-auto max-h-[62vh] w-auto max-w-full rounded-sm object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Предишна снимка"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => ((i ?? 0) - 1 + visible.length) % visible.length);
            }}
            className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-border bg-card/90 hover:border-primary hover:text-primary"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Следваща снимка"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => ((i ?? 0) + 1) % visible.length);
            }}
            className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-border bg-card/90 hover:border-primary hover:text-primary"
          >
            <ChevronRight size={22} />
          </button>

          <div
            className="flex w-full max-w-4xl flex-col items-center gap-3 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-muted-foreground">{visible[active]!.alt}</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {active + 1} / {visible.length}
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

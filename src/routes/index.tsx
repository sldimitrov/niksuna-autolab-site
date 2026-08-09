import { createFileRoute } from "@tanstack/react-router";
import { Armchair, Shield, Sun, MapPin, Sparkles, BadgeCheck } from "lucide-react";

import heroGarage from "@/assets/hero-garage.jpg";
import logoAsset from "@/assets/logo.jpg.asset.json";
import { Nav } from "@/components/site/Nav";
import { Gallery } from "@/components/site/Gallery";
import { ContactSection } from "@/components/site/ContactSection";

const title = "Niksuna's AutoLab — Автодетайлинг в Айтос";
const description =
  "Професионален автодетайлинг в Айтос, обл. Бургас: PPF защита на фарове, фолиране на автостъкла и претапициране на тавани, кори и колонки.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Armchair,
    title: "Претапициране на интериор",
    sub: "Тавани / кори / колонки",
    text: "Тавани, кори на врати и колонки, претапицирани с нови материали за фабрично изпипан вид.",
  },
  {
    icon: Sun,
    title: "Фолиране на автостъкла",
    sub: "Автомобилно фолио за стъкла",
    text: "Прецизно изрязано фолио за по-малко топлина, повече уединение и чист вид без мехури.",
  },
  {
    icon: Shield,
    title: "PPF защита",
    sub: "PPF фарове и боя",
    text: "Защитно фолио за фарове и лак — предпазва от камъчета, надрасквания и пожълтяване.",
  },
];

const trust = [
  {
    icon: BadgeCheck,
    title: "Доказана работа",
    text: "Десетки завършени автомобила, а клиентите ни тагват колите си в нашия Instagram.",
  },
  {
    icon: Sparkles,
    title: "Качествени материали",
    text: "Работим само с фолиа и материи, на които разчитаме да издържат българското лято.",
  },
  {
    icon: MapPin,
    title: "Местни, в Айтос",
    text: "Локално студио в Айтос, обл. Бургас — говорите директно с човека, който върши работата.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main>
        {/* HERO */}
        <section id="hero" className="relative flex min-h-[92vh] items-end overflow-hidden">
          <img
            src={heroGarage}
            alt="Черен автомобил в тъмно детайлинг студио"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:pb-24">
            <img
              src={logoAsset.url}
              alt="Логото на Niksuna's AutoLab"
              width={88}
              height={88}
              className="mb-6 h-20 w-20 rounded-sm object-cover sm:h-24 sm:w-24"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Айтос, обл. Бургас
            </p>
            <h1 className="mt-4 text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Niksuna&apos;s
              <br />
              <span className="text-primary">AutoLab</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
              Професионален автодетайлинг — PPF защита, фолиране на автостъкла и претапициране на
              интериор.
            </p>
            <a
              href="#contact"
              className="btn-red mt-9 inline-block rounded-sm px-8 py-4 text-sm font-semibold uppercase tracking-widest"
            >
              Свържете се с нас
            </a>
          </div>
        </section>

        {/* УСЛУГИ */}
        <section id="services" className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="claw-rule text-3xl sm:text-4xl">Услуги</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {services.map((s) => (
                <article
                  key={s.title}
                  className="rounded-sm border border-border bg-card p-6 transition-colors hover:border-primary/60"
                >
                  <s.icon size={28} className="text-primary" />
                  <h3 className="mt-5 text-xl">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground/80">{s.sub}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Gallery />

        {/* ЗАЩО НАС */}
        <section id="why" className="border-t border-border py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="claw-rule text-3xl sm:text-4xl">Защо да изберете нас</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {trust.map((t) => (
                <div key={t.title} className="flex gap-4">
                  <t.icon size={22} className="mt-1 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <h3 className="text-lg">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Niksuna&apos;s AutoLab — Айтос, обл. Бургас</p>
          <p>
            Website by{" "}
            <a
              href="https://aytosonline.com"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-primary"
            >
              Aytos Online
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

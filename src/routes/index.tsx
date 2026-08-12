import { createFileRoute } from "@tanstack/react-router";
import {
  Armchair,
  Shield,
  Sun,
  MapPin,
  Sparkles,
  BadgeCheck,
  Wand2,
  Lightbulb,
} from "lucide-react";

import heroGarage from "@/assets/car.jpg";
import logoGarage from "@/assets/logo.jpg";
import ogPhoto from "@/assets/folio/1.jpg";
import { Nav } from "@/components/site/Nav";
import { Gallery } from "@/components/site/Gallery";
import { ContactSection, LAT, LNG, PHONE, PHONE_TEL } from "@/components/site/ContactSection";
import { Phone } from "lucide-react";

const SITE = "https://niksuna-autolab-site.lovable.app";
const title = "Фолиране и претапициране в Айтос | Niksuna's AutoLab";
const description =
  "Фолиране на автостъкла, защитно фолио (PPF), претапициране на автотавани, chrome delete и полиране на фарове в Айтос, обл. Бургас. Обадете се: 0885 373 039.";
const ogImage = `${SITE}${ogPhoto}`;

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "AutoBodyShop",
  name: "Niksuna's AutoLab",
  description,
  url: SITE,
  image: ogImage,
  telephone: "+359885373039",
  email: "nikolayyy03@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Айтос",
    addressRegion: "обл. Бургас",
    addressCountry: "BG",
  },
  geo: { "@type": "GeoCoordinates", latitude: LAT, longitude: LNG },
  areaServed: ["Айтос", "Бургас", "Карнобат", "Поморие"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Услуги",
    itemListElement: [
      "Фолиране на автостъкла",
      "Защитно фолио (PPF) за фарове и стопове",
      "Претапициране на автотавани и интериорни части",
      "Chrome delete / Shadowline",
      "Полиране на фарове",
    ].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: SITE },
      { property: "og:locale", content: "bg_BG" },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "960" },
      { property: "og:image:height", content: "720" },
      { property: "og:image:type", content: "image/jpeg" },
      { name: "twitter:image", content: ogImage },
      { name: "geo.placename", content: "Айтос, обл. Бургас" },
      { name: "geo.position", content: `${LAT};${LNG}` },
    ],
    links: [{ rel: "canonical", href: SITE }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusinessLd) }],
  }),
  component: Index,
});

const services = [
  {
    icon: Sun,
    title: "Фолиране на автостъкла",
    sub: "Автомобилно фолио за стъкла",
    text: "Прецизно изрязано фолио за по-малко топлина, повече уединение и чист вид без мехури.",
  },
  {
    icon: Shield,
    title: "Защитно фолио (PPF)",
    sub: "Фарове, стопове и други елементи",
    text: "Защитно фолио за фарове, стопове и детайли — предпазва от камъчета, надрасквания и пожълтяване.",
  },
  {
    icon: Armchair,
    title: "Претапициране на автотавани",
    sub: "Кори на врати, колонки, сенници",
    text: "Тавани и интериорни части, претапицирани с нови материали за фабрично изпипан вид.",
  },
  {
    icon: Wand2,
    title: "Chrome delete / Shadowline",
    sub: "Затъмняване на хромовите елементи",
    text: "Хромът по решетки, лайсни и рамки на стъкла става черен — матов или гланц, по избор.",
  },
  {
    icon: Lightbulb,
    title: "Полиране на фарове",
    sub: "Възстановяване на прозрачност",
    text: "Премахваме пожълтяването и мътността, за да светят фаровете отново като нови.",
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
              src={logoGarage}
              alt="Логото на Niksuna's AutoLab"
              width={88}
              height={88}
              className="mb-6 h-20 w-20 rounded-sm object-cover sm:h-24 sm:w-24"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Айтос, обл. Бургас
            </p>
            <h1 className="mt-4 text-4xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
              Niksuna&apos;s
              <br />
              <span className="text-primary">AutoLab</span>
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-foreground/80">
              Фолиране · PPF · Претапициране на тавани — Айтос
            </p>
            <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
              Фолиране, PPF и тунинг — фолиране на автостъкла, PPF защита и претапициране на
              интериор.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="btn-red rounded-sm px-8 py-4 text-sm font-semibold uppercase tracking-widest"
              >
                Свържете се с нас
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-background/60 px-8 py-4 text-sm font-semibold uppercase tracking-widest backdrop-blur hover:border-primary hover:text-primary"
              >
                <Phone size={16} /> {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* УСЛУГИ */}
        <section id="services" className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="claw-rule text-3xl sm:text-4xl">Услуги</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
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
            <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
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
              href="https://aytos.online"
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

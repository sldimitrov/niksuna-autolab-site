import { createFileRoute } from "@tanstack/react-router";
import { Armchair, Shield, Sun, MapPin, Sparkles, BadgeCheck } from "lucide-react";

import heroGarage from "@/assets/hero-garage.jpg";
import { Nav } from "@/components/site/Nav";
import { Gallery } from "@/components/site/Gallery";
import { ContactSection } from "@/components/site/ContactSection";

const title = "Niksuna's AutoLab — Auto Detailing in Aytos, Bulgaria";
const description =
  "Professional auto detailing in Aytos, Burgas Region: PPF headlight protection, window tinting and interior re-wrapping of ceilings, door panels and speaker trim.";

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
    title: "Interior Re-Wrapping",
    bg: "Претапициране на тавани / кори / колонки",
    text: "Ceilings, door panels and speaker trim re-wrapped in fresh materials for a factory-tight finish.",
  },
  {
    icon: Sun,
    title: "Window Tinting",
    bg: "Фолиране на автостъкла",
    text: "Precision-cut auto glass film for heat rejection, privacy and a clean, bubble-free look.",
  },
  {
    icon: Shield,
    title: "PPF Protection",
    bg: "PPF фарове",
    text: "Paint protection film for headlights and bodywork — guarding against stone chips and yellowing.",
  },
];

const trust = [
  {
    icon: BadgeCheck,
    title: "Proven Work",
    text: "Dozens of finished builds, with customers tagging their cars on our Instagram.",
  },
  {
    icon: Sparkles,
    title: "Quality Materials",
    text: "We only install films and fabrics we trust to last through Bulgarian summers.",
  },
  {
    icon: MapPin,
    title: "Local to Aytos",
    text: "A local shop in Aytos, Burgas Region — talk to the person doing the work.",
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
            alt="Black sports car in a dark detailing garage"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:pb-24">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Aytos, Burgas Region
            </p>
            <h1 className="mt-4 text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Niksuna&apos;s
              <br />
              <span className="text-primary">AutoLab</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
              Professional auto detailing — PPF protection, window tinting and interior re-wrapping.
            </p>
            <a
              href="#contact"
              className="btn-red mt-9 inline-block rounded-sm px-8 py-4 text-sm font-semibold uppercase tracking-widest"
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="claw-rule text-3xl sm:text-4xl">Services</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {services.map((s) => (
                <article
                  key={s.title}
                  className="rounded-sm border border-border bg-card p-6 transition-colors hover:border-primary/60"
                >
                  <s.icon size={28} className="text-primary" />
                  <h3 className="mt-5 text-xl">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground/80">{s.bg}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Gallery />

        {/* WHY CHOOSE US */}
        <section id="why" className="border-t border-border py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="claw-rule text-3xl sm:text-4xl">Why Choose Us</h2>
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
          <p>© {new Date().getFullYear()} Niksuna&apos;s AutoLab — Aytos, Burgas Region</p>
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

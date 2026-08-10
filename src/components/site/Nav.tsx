import { Phone } from "lucide-react";

import logoAsset from "@/assets/logo.jpg.asset.json";
import { PHONE, PHONE_TEL } from "./ContactSection";

const links = [
  { href: "#services", label: "Услуги" },
  { href: "#portfolio", label: "Проекти" },
  { href: "#why", label: "Защо нас" },
  { href: "#contact", label: "Контакти" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:flex sm:justify-between">
        <a href="#hero" className="flex min-w-0 items-center gap-2.5">
          <img
            src={logoAsset.url}
            alt="Логото на Niksuna's AutoLab"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-sm object-cover"
          />
          <span className="truncate font-display text-lg font-bold tracking-wide">
            Niksuna&apos;s <span className="text-primary">AutoLab</span>
          </span>
        </a>
        <ul className="hidden shrink-0 items-center gap-7 text-sm font-medium uppercase tracking-widest text-muted-foreground sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`tel:${PHONE_TEL}`}
          aria-label={`Обади се на ${PHONE}`}
          className="btn-red inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm px-4 text-xs font-semibold uppercase tracking-widest"
        >
          <Phone size={14} />
          <span className="hidden sm:inline">{PHONE}</span>
          <span className="sm:hidden">Обади се</span>
        </a>
      </nav>
    </header>
  );
}

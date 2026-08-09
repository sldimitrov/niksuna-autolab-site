const links = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Work" },
  { href: "#why", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:flex sm:justify-between">
        <a href="#hero" className="min-w-0 truncate font-display text-lg font-bold tracking-wide">
          Niksuna&apos;s <span className="text-primary">AutoLab</span>
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
          href="#contact"
          className="btn-red shrink-0 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-widest sm:hidden"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}

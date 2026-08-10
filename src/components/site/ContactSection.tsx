import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

// TODO (EmailJS): инсталирайте @emailjs/browser и попълнете ключовете тук.
// const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
// const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
// const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export const PHONE = "0885 373 039";
export const PHONE_TEL = "+359885373039";
const EMAIL = "nikolayyy03@gmail.com";
const INSTAGRAM_URL = "https://instagram.com/";

// 42°42'07.6"N 27°15'24.8"E
export const LAT = 42.702111;
export const LNG = 27.256889;
const COORDS_LABEL = "42°42'07.6\"N 27°15'24.8\"E";
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`;
const MAPS_EMBED = `https://maps.google.com/maps?q=${LAT},${LNG}&z=15&hl=bg&output=embed`;

const SERVICES = [
  "Фолиране на автостъкла",
  "Защитно фолио (PPF)",
  "Претапициране на таван / интериор",
  "Chrome delete / Shadowline",
  "Полиране на фарове",
  "Друго / не съм сигурен",
];

const TIMING = [
  "Възможно най-скоро",
  "Тази седмица",
  "През следващите 2–4 седмици",
  "Само проучвам цени и опции",
];

export function ContactSection() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [timing, setTiming] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", car: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Тук се извиква EmailJS с { service, timing, ...form }.
    setSent(true);
  };

  return (
    <section id="contact" className="border-t border-border py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
        <div>
          <h2 className="claw-rule text-3xl sm:text-4xl">Свържете се с нас</h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Отговорете на два бързи въпроса и ще се свържем с вас с подробности и свободни часове.
            Или просто ни се обадете.
          </p>

          <a
            href={`tel:${PHONE_TEL}`}
            className="btn-red mt-7 inline-flex items-center gap-2.5 rounded-sm px-7 py-4 text-sm font-semibold uppercase tracking-widest"
          >
            <Phone size={18} />
            Обади се: {PHONE}
          </a>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-primary" />
              <a href={`tel:${PHONE_TEL}`} className="hover:text-primary">
                {PHONE}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-primary" />
              <a href={`mailto:${EMAIL}`} className="hover:text-primary">
                {EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram size={18} className="shrink-0 text-primary" />
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="shrink-0 text-primary" />
              <span className="text-muted-foreground">Айтос, обл. Бургас</span>
            </li>
          </ul>

          {/* КАРТА */}
          <div className="mt-8 overflow-hidden rounded-sm border border-border bg-card">
            <iframe
              title="Локация на Niksuna's AutoLab в Айтос"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-56 w-full border-0 grayscale-[35%]"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold">Айтос, обл. Бургас</p>
                <p className="mt-1 text-xs text-muted-foreground">{COORDS_LABEL}</p>
              </div>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:border-primary hover:text-primary"
              >
                <MapPin size={14} />
                Виж в Google Maps
              </a>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-sm border border-border bg-card p-6 sm:p-8"
        >
          {/* прогрес */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Стъпка {step + 1} от 3
          </p>

          {step === 0 && (
            <div className="mt-5">
              <h3 className="text-2xl">От каква услуга имате нужда?</h3>
              <div className="mt-6 space-y-2.5">
                {SERVICES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setService(s);
                      setStep(1);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
                      service === s
                        ? "border-primary text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                    }`}
                  >
                    {s}
                    <ArrowRight size={16} className="shrink-0 text-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="mt-5">
              <h3 className="text-2xl">Кога искате да се случи?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Избрана услуга: <span className="text-foreground">{service}</span>
              </p>
              <div className="mt-6 space-y-2.5">
                {TIMING.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTiming(t);
                      setStep(2);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
                      timing === t
                        ? "border-primary text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                    }`}
                  >
                    {t}
                    <ArrowRight size={16} className="shrink-0 text-primary" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary"
              >
                <ArrowLeft size={14} /> Назад
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="mt-5 space-y-5">
              <div>
                <h3 className="text-2xl">Как да се свържем с вас?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="text-foreground">{service}</span> · {timing}
                </p>
              </div>

              <div>
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest">
                  Име
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest">
                  Телефон
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="car" className="text-xs font-semibold uppercase tracking-widest">
                  Автомобил (марка, модел, година)
                </label>
                <input
                  id="car"
                  value={form.car}
                  onChange={(e) => setForm({ ...form, car: e.target.value })}
                  className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest">
                  Допълнителни детайли (по избор)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full resize-none rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="btn-red w-full rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-widest"
              >
                Изпрати запитване
              </button>

              <div className="rounded-sm border border-border p-4 text-sm">
                <p className="text-muted-foreground">Бърз отговор? Обадете се директно:</p>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="mt-2 inline-flex items-center gap-2 font-semibold text-primary"
                >
                  <Phone size={16} /> {PHONE}
                </a>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary"
              >
                <ArrowLeft size={14} /> Назад
              </button>

              {sent && (
                <p className="flex items-center gap-2 text-sm text-primary">
                  <Check size={16} /> Благодарим! Ще се свържем с вас на посочения телефон.
                </p>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

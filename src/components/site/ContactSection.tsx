import { useState } from "react";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

// TODO (EmailJS): инсталирайте @emailjs/browser и попълнете ключовете тук.
// const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
// const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
// const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
// След това в handleSubmit:
// await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, { publicKey: EMAILJS_PUBLIC_KEY });

const PHONE = "0885 373 039";
const EMAIL = "nikolayyy03@gmail.com";
const INSTAGRAM_URL = "https://instagram.com/";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Тук се извиква EmailJS (виж коментарите по-горе).
    setSent(true);
  };

  return (
    <section id="contact" className="border-t border-border py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
        <div>
          <h2 className="claw-rule text-3xl sm:text-4xl">Свържете се с нас</h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Опишете автомобила си и какво желаете да направим. Ще се свържем с вас с подробности и
            свободни часове.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-primary" />
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="hover:text-primary">
                {PHONE}
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
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-sm border border-border bg-card p-6 sm:p-8"
        >
          <div className="space-y-5">
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
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest">
                Съобщение
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full resize-none rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="btn-red w-full rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-widest"
            >
              Изпрати съобщение
            </button>
            {sent && (
              <p className="text-sm text-muted-foreground">
                Благодарим — съобщението ще бъде изпратено, след като свържем имейл доставката.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

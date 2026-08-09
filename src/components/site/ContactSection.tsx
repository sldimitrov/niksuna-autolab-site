import { useState } from "react";
import { Instagram, MapPin, Phone } from "lucide-react";

// TODO (EmailJS): install @emailjs/browser and fill these in.
// const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
// const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
// const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
// Then in handleSubmit:
// await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, { publicKey: EMAILJS_PUBLIC_KEY });

// Placeholder contact details — replace with the real ones.
const PHONE = "+359 000 000 000";
const INSTAGRAM_URL = "https://instagram.com/";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // EmailJS send goes here (see comments above).
    setSent(true);
  };

  return (
    <section id="contact" className="border-t border-border py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
        <div>
          <h2 className="claw-rule text-3xl sm:text-4xl">Contact Us</h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Tell us about your car and what you want done. We&apos;ll get back to you with details
            and availability.
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
              <span className="text-muted-foreground">Aytos, Burgas Region</span>
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
                Name
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
                Phone
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
                Message
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
              Send Message
            </button>
            {sent && (
              <p className="text-sm text-muted-foreground">
                Thanks — your message is ready to send once email delivery is connected.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

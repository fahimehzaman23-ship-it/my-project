import { useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { TextAreaField, TextField } from '../components/ui/FormControls';
import { CONTACT } from '../data/properties';
import { isValidEmail, mailtoHref } from '../lib/mailto';

const INTERESTS = ['Buying a home', 'Selling a property', 'Investment advice', 'Relocation'];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: INTERESTS[0],
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!isValidEmail(form.email)) next.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) next.message = 'A short note helps us route your enquiry.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const body = [
      `Enquiry: ${form.interest}`,
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || '—'}`,
      '',
      form.message,
    ].join('\n');

    window.location.href = mailtoHref(CONTACT.email, `Website enquiry — ${form.interest}`, body);
    setSent(true);
  };

  return (
    <>
      <PageHero
        label="Contact"
        title="Start a conversation"
        subtitle="Tell us what you are looking for, or what you are considering selling. A senior advisor replies within one business day."
        imageId="1600573472550-8090b5e0745e"
      />

      <section className="bg-ivory py-16 sm:py-20 lg:py-24">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            {sent ? (
              <div className="rounded-2xl border border-champagne/40 bg-champagne/10 p-8 text-center sm:p-12">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-champagne">
                  <CheckCircle2 aria-hidden="true" className="h-6 w-6" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-medium text-navy">
                  Your enquiry is ready to send
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy/60">
                  Your mail client has opened with your message filled in. If it did not, email us
                  directly at{' '}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-champagne-deep underline underline-offset-4"
                  >
                    {CONTACT.email}
                  </a>
                  .
                </p>
                <Button
                  variant="outlineDark"
                  className="mt-7"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', phone: '', interest: INTERESTS[0], message: '' });
                  }}
                >
                  Send another enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5" noValidate>
                <h2 className="font-display text-2xl font-semibold text-navy sm:text-[1.9rem]">
                  Send us a note
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    id="contact-name"
                    label="Full name"
                    required
                    autoComplete="name"
                    value={form.name}
                    error={errors.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                  />
                  <TextField
                    id="contact-email"
                    label="Email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    error={errors.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    id="contact-phone"
                    label="Phone (optional)"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  />
                  <div>
                    <label
                      htmlFor="contact-interest"
                      className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-navy/50"
                    >
                      How can we help?
                    </label>
                    <select
                      id="contact-interest"
                      value={form.interest}
                      onChange={(event) => setForm({ ...form, interest: event.target.value })}
                      className="mt-2.5 w-full appearance-none rounded-xl border border-navy/12 bg-ivory px-4 py-3 font-sans text-sm text-navy transition-colors duration-300 hover:border-navy/25 focus:border-champagne focus:outline-none"
                    >
                      {INTERESTS.map((interest) => (
                        <option key={interest} value={interest}>
                          {interest}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <TextAreaField
                  id="contact-message"
                  label="Message"
                  required
                  rows={5}
                  placeholder="Tell us about the property or the brief."
                  value={form.message}
                  error={errors.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                />

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Button type="submit" size="lg">
                    Send enquiry
                  </Button>
                  <p className="font-sans text-xs text-navy/45">{CONTACT.hours}</p>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="rounded-2xl bg-navy p-8 text-ivory sm:p-10">
              <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-champagne">
                Horizon Properties
              </h2>
              <ul className="mt-8 space-y-7">
                <li>
                  <span className="flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.18em] text-ivory/45">
                    <Phone aria-hidden="true" className="h-3.5 w-3.5 text-champagne" />
                    Telephone
                  </span>
                  <a
                    href={CONTACT.phoneHref}
                    className="mt-2.5 block font-display text-xl text-ivory transition-colors duration-300 hover:text-champagne"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.18em] text-ivory/45">
                    <Mail aria-hidden="true" className="h-3.5 w-3.5 text-champagne" />
                    Email
                  </span>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-2.5 block break-all font-display text-lg text-ivory transition-colors duration-300 hover:text-champagne"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.18em] text-ivory/45">
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-champagne" />
                    Studio
                  </span>
                  <p className="mt-2.5 text-sm leading-relaxed text-ivory/75">
                    {CONTACT.office}
                    <br />
                    {CONTACT.city}
                  </p>
                </li>
                <li>
                  <span className="flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.18em] text-ivory/45">
                    <Clock aria-hidden="true" className="h-3.5 w-3.5 text-champagne" />
                    Office hours
                  </span>
                  <p className="mt-2.5 text-sm leading-relaxed text-ivory/75">{CONTACT.hours}</p>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

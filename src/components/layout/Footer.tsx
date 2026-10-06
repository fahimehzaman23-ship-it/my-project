import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '../ui/Logo';
import { CONTACT, NAV_LINKS } from '../../data/properties';
import { isValidEmail, mailtoHref } from '../../lib/mailto';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/horizonproperties', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/horizonproperties', Icon: Linkedin },
  { label: 'Facebook', href: 'https://facebook.com/horizonproperties', Icon: Facebook },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'sent'>('idle');

  const subscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }
    const body = `Please add ${email.trim()} to the Horizon Properties newsletter.`;
    window.location.href = mailtoHref(CONTACT.email, 'Newsletter subscription', body);
    setStatus('sent');
    setEmail('');
  };

  return (
    <footer className="bg-navy text-ivory">
      <div className="shell pb-10 pt-20 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
              Horizon Properties represents architecturally significant homes and investment
              residences across the United States, with a practice built on discretion, evidence
              and long relationships.
            </p>
            <ul className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={`Horizon Properties on ${label}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/75 transition-all duration-300 ease-premium hover:border-champagne hover:bg-champagne hover:text-navy"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-champagne">
              Explore
            </h2>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/70 transition-colors duration-300 hover:text-champagne"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-champagne">
              Contact
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-ivory/70">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-start gap-3 transition-colors duration-300 hover:text-champagne"
                >
                  <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 break-all transition-colors duration-300 hover:text-champagne"
                >
                  <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                <span>
                  {CONTACT.office}
                  <br />
                  {CONTACT.city}
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-champagne">
              The Horizon Brief
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ivory/60">
              New listings and market notes, sent monthly. No more than one email a month.
            </p>
            <form onSubmit={subscribe} className="mt-5" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/5 p-1.5 pl-4 transition-colors duration-300 focus-within:border-champagne">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="you@email.com"
                  aria-invalid={status === 'error'}
                  className="min-w-0 flex-1 bg-transparent py-2 font-sans text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to the Horizon brief"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-champagne text-navy transition-colors duration-300 hover:bg-champagne-soft"
                >
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
              <p
                role="status"
                aria-live="polite"
                className={`mt-3 text-xs ${
                  status === 'error' ? 'text-champagne-soft' : 'text-ivory/55'
                }`}
              >
                {status === 'error'
                  ? 'Please enter a valid email address.'
                  : status === 'sent'
                    ? 'Your mail client is open — send it and you are on the list.'
                    : CONTACT.hours}
              </p>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-7 font-sans text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</p>
          <p>Licensed real estate brokerage · Austin, Texas</p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import Logo from '../ui/Logo';
import { CONTACT, NAV_LINKS } from '../../data/properties';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useLockBodyScroll(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-premium',
          solid
            ? 'bg-ivory/95 shadow-[0_1px_0_rgba(10,17,40,0.07),0_20px_44px_-32px_rgba(10,17,40,0.55)] backdrop-blur-md'
            : 'bg-gradient-to-b from-navy/65 via-navy/25 to-transparent',
        ].join(' ')}
      >
        <div className="shell">
          <div
            className={`flex items-center justify-between gap-4 transition-[padding] duration-500 ease-premium ${
              solid ? 'py-3' : 'py-4 sm:py-5'
            }`}
          >
            <Link
              to="/"
              aria-label="Horizon Properties — home"
              className="shrink-0 transition-opacity duration-300 hover:opacity-85"
            >
              <Logo tone={solid ? 'dark' : 'light'} />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8 xl:gap-10">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        [
                          'relative inline-block py-1 font-sans text-[13px] font-medium tracking-[0.06em] transition-colors duration-300',
                          'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-champagne after:transition-transform after:duration-500 after:ease-premium',
                          'hover:after:scale-x-100',
                          solid
                            ? isActive
                              ? 'text-navy after:scale-x-100'
                              : 'text-navy/70 hover:text-navy'
                            : isActive
                              ? 'text-ivory after:scale-x-100'
                              : 'text-ivory/75 hover:text-ivory',
                        ].join(' ')
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                href={CONTACT.phoneHref}
                aria-label={`Call Horizon Properties on ${CONTACT.phone}`}
                className={[
                  'hidden items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[13px] font-medium tracking-[0.02em] transition-all duration-300 ease-premium sm:inline-flex',
                  solid
                    ? 'border-navy/25 text-navy hover:bg-navy hover:text-ivory'
                    : 'border-ivory/45 text-ivory hover:border-ivory hover:bg-ivory hover:text-navy',
                ].join(' ')}
              >
                <Phone aria-hidden="true" className="h-3.5 w-3.5" />
                {CONTACT.phone}
              </a>

              <button
                type="button"
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((value) => !value)}
                className={[
                  'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden',
                  solid
                    ? 'border-navy/25 text-navy hover:bg-navy hover:text-ivory'
                    : 'border-ivory/40 text-ivory hover:bg-ivory/10',
                ].join(' ')}
              >
                {open ? (
                  <X aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Menu aria-hidden="true" className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-navy lg:hidden"
          >
            <div className="shell flex h-full flex-col overflow-y-auto pb-10 pt-28">
              <nav aria-label="Mobile">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.to}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.06 + index * 0.055,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className="flex items-baseline gap-4 border-b border-ivory/10 py-4"
                      >
                        {({ isActive }) => (
                          <>
                            <span className="font-sans text-[11px] tracking-[0.2em] text-champagne">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={`font-display text-3xl font-medium ${
                                isActive ? 'text-champagne' : 'text-ivory'
                              }`}
                            >
                              {link.label}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto space-y-5 pt-10">
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-3 font-display text-xl text-ivory"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-champagne" />
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block font-sans text-sm text-ivory/70 transition-colors hover:text-champagne"
                >
                  {CONTACT.email}
                </a>
                <p className="font-sans text-sm leading-relaxed text-ivory/50">
                  {CONTACT.office}
                  <br />
                  {CONTACT.city}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

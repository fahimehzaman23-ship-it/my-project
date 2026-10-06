import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarCheck, X } from 'lucide-react';
import type { Agent, Property } from '../data/types';
import useLockBodyScroll from '../hooks/useLockBodyScroll';
import { isValidEmail, mailtoHref } from '../lib/mailto';
import { TextAreaField, TextField } from './ui/FormControls';
import Button from './ui/Button';

type Props = {
  property: Property;
  agent: Agent;
  open: boolean;
  onClose: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Viewing request. Composes a real email to the listing advisor. */
export default function ScheduleViewingDialog({ property, agent, open, onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSent(false);
      setErrors({});
      setForm({ name: '', email: '', date: '', time: '', notes: '' });
    }
  }, [open]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!isValidEmail(form.email)) next.email = 'Please enter a valid email address.';
    if (!form.date) next.date = 'Choose a preferred date.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const body = [
      `Viewing request — ${property.title}`,
      `Reference: ${property.id}`,
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Preferred date: ${form.date}${form.time ? ` at ${form.time}` : ''}`,
      '',
      form.notes.trim() ? `Notes: ${form.notes}` : 'Notes: —',
    ].join('\n');

    window.location.href = mailtoHref(
      agent.email,
      `Viewing request — ${property.title}`,
      body,
    );
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-navy/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="viewing-dialog-title"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-ivory p-6 sm:rounded-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Schedule a viewing</p>
                <h2
                  id="viewing-dialog-title"
                  className="mt-3 font-display text-2xl font-semibold leading-snug text-navy"
                >
                  {property.title}
                </h2>
                <p className="mt-1.5 text-sm text-navy/55">
                  With {agent.name} · {agent.role}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close viewing request"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-300 hover:bg-navy hover:text-ivory"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            {sent ? (
              <div className="mt-8 rounded-xl border border-champagne/40 bg-champagne/10 p-6 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy text-champagne">
                  <CalendarCheck aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-lg font-medium text-navy">
                  Your request is ready to send
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">
                  Your mail client has opened with the details filled in. {agent.name} confirms
                  viewings within one business day.
                </p>
                <Button className="mt-6" onClick={onClose}>
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-7 space-y-5" noValidate>
                <TextField
                  id="viewing-name"
                  label="Full name"
                  required
                  autoComplete="name"
                  value={form.name}
                  error={errors.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                />
                <TextField
                  id="viewing-email"
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    id="viewing-date"
                    label="Preferred date"
                    type="date"
                    required
                    value={form.date}
                    error={errors.date}
                    onChange={(event) => setForm({ ...form, date: event.target.value })}
                  />
                  <TextField
                    id="viewing-time"
                    label="Preferred time"
                    type="time"
                    value={form.time}
                    onChange={(event) => setForm({ ...form, time: event.target.value })}
                  />
                </div>
                <TextAreaField
                  id="viewing-notes"
                  label="Notes"
                  rows={3}
                  placeholder="Anything we should know before the viewing?"
                  value={form.notes}
                  onChange={(event) => setForm({ ...form, notes: event.target.value })}
                />

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Button type="submit">Request viewing</Button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="font-sans text-sm text-navy/55 underline-offset-4 transition-colors hover:text-champagne hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

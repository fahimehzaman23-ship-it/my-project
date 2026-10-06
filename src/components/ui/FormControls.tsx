import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

const base =
  'w-full rounded-xl border bg-ivory px-4 py-3 font-sans text-sm text-navy placeholder:text-navy/35 transition-colors duration-300 focus:outline-none';
const ok = 'border-navy/12 hover:border-navy/25 focus:border-champagne';
const bad = 'border-red-400/70 focus:border-red-500';

const labelClasses = 'font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-navy/50';

type TextFieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ id, label, error, className = '', ...rest }: TextFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {rest.required ? <span className="ml-1 text-champagne">*</span> : null}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2.5 ${base} ${error ? bad : ok}`}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextAreaProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ id, label, error, className = '', ...rest }: TextAreaProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {rest.required ? <span className="ml-1 text-champagne">*</span> : null}
      </label>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2.5 resize-none ${base} ${error ? bad : ok}`}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

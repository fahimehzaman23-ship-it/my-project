import type { ReactNode } from 'react';
import SectionLabel from './SectionLabel';
import { photo, photoSet } from '../../lib/images';

type Props = {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  imageId?: string;
  children?: ReactNode;
};

/** Dark band that opens every inner page, so the transparent header stays legible. */
export default function PageHero({ label, title, subtitle, imageId, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      {imageId ? (
        <img
          src={photo(imageId, 1920)}
          srcSet={photoSet(imageId)}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          loading="eager"
          decoding="async"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/85 to-navy"
      />
      <div className="shell relative">
        <SectionLabel tone="light">{label}</SectionLabel>
        <h1 className="mt-5 max-w-4xl font-display text-[2.15rem] font-semibold leading-[1.08] text-ivory sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/70 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

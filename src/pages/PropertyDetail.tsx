import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, CalendarCheck, Heart, MapPin, Phone } from 'lucide-react';
import AmenityList from '../components/AmenityList';
import PropertyCarousel from '../components/PropertyCarousel';
import PropertyGallery from '../components/PropertyGallery';
import ScheduleViewingDialog from '../components/ScheduleViewingDialog';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import SectionLabel from '../components/ui/SectionLabel';
import { useFavorites } from '../hooks/useFavorites';
import { similarTo } from '../hooks/usePropertyFilters';
import { getAgent, getPropertyBySlug } from '../data/properties';
import { formatNumber, formatPrice, formatPriceShort } from '../lib/format';
import { photo, photoSet } from '../lib/images';
import { mailtoHref } from '../lib/mailto';

export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const property = getPropertyBySlug(slug ?? '');
  const { isFavorite, toggle } = useFavorites();
  const [viewingOpen, setViewingOpen] = useState(false);

  if (!property) return <Navigate to="/404" replace />;

  const agent = getAgent(property.agentId);
  const similar = similarTo(property);
  const saved = isFavorite(property.id);
  const cover = property.images[0];

  const enquiryHref = mailtoHref(
    agent.email,
    `Enquiry — ${property.title}`,
    `Hello ${agent.name.split(' ')[0]},\n\nI would like more information about ${property.title} (${property.location}, reference ${property.id}).\n\nThank you.`,
  );

  const facts = [
    { label: 'Bedrooms', value: String(property.beds) },
    { label: 'Bathrooms', value: String(property.baths) },
    { label: 'Interior', value: `${formatNumber(property.sqft)} sq ft` },
    { label: 'Plot', value: property.lot },
    { label: 'Built', value: String(property.year) },
    { label: 'Type', value: property.category },
  ];

  return (
    <div className="pb-24 lg:pb-0">
      <section className="relative isolate overflow-hidden bg-navy pb-12 pt-32 sm:pb-14 sm:pt-36 lg:pb-16 lg:pt-40">
        <img
          src={photo(cover.id, 1920)}
          srcSet={photoSet(cover.id)}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/90 to-navy"
        />

        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="font-sans text-[11px] tracking-[0.16em] text-ivory/50">
            <Link to="/properties" className="transition-colors duration-300 hover:text-champagne">
              Properties
            </Link>
            <span aria-hidden="true" className="mx-2.5">
              /
            </span>
            <span className="text-ivory/80">{property.title}</span>
          </nav>

          <p className="eyebrow mt-7">
            {property.category} · {property.status}
          </p>

          <h1 className="mt-4 max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.08] text-ivory sm:text-5xl lg:text-[3.4rem]">
            {property.title}
          </h1>

          <p className="mt-5 flex items-center gap-2 text-sm text-ivory/70 sm:text-base">
            <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-champagne" />
            {property.location}
          </p>

          <div className="mt-9 flex flex-wrap items-end justify-between gap-6 border-t border-ivory/15 pt-7">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/45">
                Guide price
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-champagne sm:text-4xl">
                {formatPrice(property.price)}
              </p>
            </div>

            <button
              type="button"
              aria-pressed={saved}
              onClick={() => toggle(property.id)}
              className={[
                'inline-flex min-h-[44px] items-center gap-2.5 rounded-full border px-5 font-sans text-sm font-medium transition-all duration-300 ease-premium',
                saved
                  ? 'border-champagne bg-champagne text-navy'
                  : 'border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory hover:text-navy',
              ].join(' ')}
            >
              <Heart aria-hidden="true" className={`h-4 w-4 ${saved ? 'fill-navy' : ''}`} />
              {saved ? 'Saved' : 'Save property'}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-12 sm:py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <PropertyGallery property={property} />

            <Reveal className="mt-14">
              <SectionLabel>Overview</SectionLabel>
              <h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-snug text-navy sm:text-[2.1rem]">
                {property.headline}
              </h2>
              <p className="mt-6 text-base leading-[1.8] text-navy/70">{property.description}</p>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="font-display text-xl font-medium text-navy sm:text-2xl">
                Key features
              </h2>
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 border-b border-navy/8 py-4 text-[15px] leading-relaxed text-navy/75"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="font-display text-xl font-medium text-navy sm:text-2xl">
                Living specification
              </h2>
              <AmenityList amenities={property.amenities} />
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-7">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="font-sans text-[10px] uppercase tracking-[0.18em] text-navy/45">
                        {fact.label}
                      </dt>
                      <dd className="mt-2 font-display text-lg font-medium text-navy">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl bg-navy p-6 text-ivory sm:p-7">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-champagne">
                  Listing advisor
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={photo(agent.portraitId, 240)}
                    alt={`Portrait of ${agent.name}`}
                    width={240}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-16 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-lg font-medium text-ivory">{agent.name}</p>
                    <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.16em] text-ivory/50">
                      {agent.role}
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  <Button
                    href={enquiryHref}
                    variant="champagne"
                    size="lg"
                    className="w-full"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Contact agent
                  </Button>
                  <Button
                    onClick={() => setViewingOpen(true)}
                    variant="outlineLight"
                    size="lg"
                    className="w-full"
                    icon={<CalendarCheck className="h-4 w-4" />}
                  >
                    Schedule a viewing
                  </Button>
                </div>

                <div className="mt-7 space-y-3 border-t border-ivory/15 pt-6 font-sans text-sm">
                  <a
                    href={`mailto:${agent.email}`}
                    className="block break-all text-ivory/70 transition-colors duration-300 hover:text-champagne"
                  >
                    {agent.email}
                  </a>
                  <a
                    href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-2.5 text-ivory/70 transition-colors duration-300 hover:text-champagne"
                  >
                    <Phone aria-hidden="true" className="h-3.5 w-3.5 text-champagne" />
                    {agent.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>You May Also Like</SectionLabel>
              <h2 className="mt-5 font-display text-[1.7rem] font-semibold text-navy sm:text-[2.1rem]">
                Similar residences
              </h2>
            </div>
            <Link
              to="/properties"
              className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-navy transition-colors duration-300 hover:text-champagne"
            >
              All properties
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-10">
            <PropertyCarousel properties={similar} label="Similar residences" />
          </div>
        </div>
      </section>

      {/* Sticky contact bar for narrow screens. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-navy/10 bg-ivory/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-navy/45">
              Guide price
            </p>
            <p className="font-display text-base font-medium text-navy">
              {formatPriceShort(property.price)}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button href={enquiryHref} variant="outlineDark">
              Contact
            </Button>
            <Button onClick={() => setViewingOpen(true)}>Viewing</Button>
          </div>
        </div>
      </div>

      <ScheduleViewingDialog
        property={property}
        agent={agent}
        open={viewingOpen}
        onClose={() => setViewingOpen(false)}
      />
    </div>
  );
}

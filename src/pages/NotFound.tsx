import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <>
      <PageHero
        label="404"
        title="That page has moved on"
        subtitle="The residence or page you were looking for is no longer here. The current portfolio is a good place to start again."
      />
      <section className="bg-ivory py-20 sm:py-24">
        <div className="shell flex flex-wrap items-center gap-3">
          <Button to="/properties">Browse properties</Button>
          <Button to="/" variant="outlineDark">
            Back to home
          </Button>
          <Link
            to="/contact"
            className="font-sans text-sm text-navy/60 underline-offset-4 transition-colors hover:text-champagne hover:underline"
          >
            Or speak to an advisor
          </Link>
        </div>
      </section>
    </>
  );
}

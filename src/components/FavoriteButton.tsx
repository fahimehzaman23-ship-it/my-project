import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

type Props = {
  propertyId: string;
  title: string;
  className?: string;
};

/** Save/unsave a property. Persisted locally so the state survives reloads. */
export default function FavoriteButton({ propertyId, title, className = '' }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(propertyId);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${title} from saved properties` : `Save ${title}`}
      title={active ? 'Remove from saved' : 'Save property'}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(propertyId);
      }}
      className={[
        'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ease-premium',
        active
          ? 'border-champagne bg-champagne text-navy'
          : 'border-ivory/40 bg-navy/35 text-ivory backdrop-blur-sm hover:border-ivory hover:bg-navy/60',
        className,
      ].join(' ')}
    >
      <Heart
        aria-hidden="true"
        className={`h-[18px] w-[18px] transition-transform duration-300 ${
          active ? 'scale-105 fill-navy' : ''
        }`}
      />
    </button>
  );
}

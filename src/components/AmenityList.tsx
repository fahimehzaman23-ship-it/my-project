import {
  Anchor,
  ArrowUpDown,
  Bath,
  BellRing,
  Box,
  Car,
  Check,
  Cpu,
  Dumbbell,
  Film,
  Flame,
  PawPrint,
  ShieldCheck,
  Sun,
  Trees,
  UtensilsCrossed,
  Waves,
  Wine,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const RULES: { pattern: RegExp; Icon: LucideIcon }[] = [
  { pattern: /pool/i, Icon: Waves },
  { pattern: /wine/i, Icon: Wine },
  { pattern: /(gym|fitness)/i, Icon: Dumbbell },
  { pattern: /(elevator|lift)/i, Icon: ArrowUpDown },
  { pattern: /(garage|parking|motor court|charging)/i, Icon: Car },
  { pattern: /(garden|landscape|native planting)/i, Icon: Trees },
  { pattern: /solar/i, Icon: Sun },
  { pattern: /(security|gate|gated)/i, Icon: ShieldCheck },
  { pattern: /(fire|hearth)/i, Icon: Flame },
  { pattern: /(spa|sauna|hammam|bath)/i, Icon: Bath },
  { pattern: /(cinema|screen)/i, Icon: Film },
  { pattern: /concierge/i, Icon: BellRing },
  { pattern: /pet/i, Icon: PawPrint },
  { pattern: /(storage|store)/i, Icon: Box },
  { pattern: /(berth|dock|beach|frontage|waterfront|lake|ocean|marina|river)/i, Icon: Anchor },
  { pattern: /(smart|automation|audio|climate)/i, Icon: Cpu },
  { pattern: /(kitchen|catering)/i, Icon: UtensilsCrossed },
];

const iconFor = (label: string): LucideIcon => {
  const match = RULES.find((rule) => rule.pattern.test(label));
  return match ? match.Icon : Check;
};

/** Amenities rendered as a "living specification" grid — icons, not a plain list. */
export default function AmenityList({ amenities }: { amenities: string[] }) {
  return (
    <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
      {amenities.map((amenity) => {
        const Icon = iconFor(amenity);
        return (
          <li
            key={amenity}
            className="flex items-center gap-3.5 bg-ivory px-5 py-4 font-sans text-sm text-navy/75"
          >
            <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-champagne" />
            {amenity}
          </li>
        );
      })}
    </ul>
  );
}

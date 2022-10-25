import { CargoCard } from './CargoCard';

const DEFAULT_TITLE = 'Rocket launcher';
const DEFAULT_DESCRIPTION =
  'A rocket launcher is a device that launches an unguided, rocket-propelled projectile.';

const DEFAULT_ENTRIES = [
  { label: 'Value', value: 100 },
  { label: 'Weight', value: 500 }
];

const CargoCardSkeleton = () => {
  return (
    <CargoCard
      title={DEFAULT_TITLE}
      description={DEFAULT_DESCRIPTION}
      imageUrl=""
      entries={DEFAULT_ENTRIES}
      isLoading={true}
    />
  );
};

export { CargoCardSkeleton };

import { CargoCard } from './CargoCard';

const DEFAULT_TITLE = 'Rocket launcher';
const DEFAULT_DESCRIPTION =
  'A rocket launcher is a device that launches an unguided, rocket-propelled projectile.';

const CargoCardSkeleton = () => {
  return (
    <CargoCard
      title={DEFAULT_TITLE}
      description={DEFAULT_DESCRIPTION}
      imageUrl=""
      entries={[
        { label: 'Value', value: 100 },
        { label: 'Weight', value: 500 }
      ]}
      loading={true}
    />
  );
};

export { CargoCardSkeleton };

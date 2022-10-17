import { arrayOf, func, number, object, shape } from 'prop-types';

import { Button } from '../Button/Button';
import { CargoCard } from '../CargoCard/CargoCard';
import { SummaryCard } from '../SummaryCard/SummaryCard';

import cargoHoldImageUrl from './assets/cargo-hold.png';
import storageImageUrl from './assets/storage.png';

import styles from './Dashboard.module.css';

const propTypes = {
  storage: shape({
    items: arrayOf(object.isRequired).isRequired,
    totalValue: number.isRequired,
    totalWeight: number.isRequired
  }).isRequired,
  cargoHold: shape({
    items: arrayOf(object.isRequired).isRequired,
    totalValue: number.isRequired,
    totalWeight: number.isRequired,
    weightLimit: number.isRequired
  }).isRequired,
  onAddNewItem: func.isRequired,
  onResetItems: func.isRequired
  // onMoveToCargoHold: func.isRequired,
  // onMoveToStorage: func.isRequired
};

const DashboardView = ({
  cargoHold,
  storage,
  onAddNewItem,
  onResetItems
  // onMoveToCargoHold,
  // onMoveToStorage
}) => (
  <div className={styles.root}>
    <div className={styles.column}>
      <SummaryCard
        title="Storage"
        imageUrl={storageImageUrl}
        entries={[
          { label: 'Value', value: storage.totalValue },
          { label: 'Weight', value: storage.totalWeight }
        ]}
      />
      <Button
        variant="outlined"
        theme="accent"
        size="md"
        icon="plus"
        onClick={onAddNewItem}
      >
        Add New Cargo
      </Button>
      <ul className={styles.list}>
        {storage.items.map(item => (
          <li key={item.id}>
            <CargoCard
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              entries={[
                { label: 'Value', value: item.value },
                { label: 'Weight', value: item.weight }
              ]}
            />
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.column}>
      <SummaryCard
        title="Cargo Hold"
        imageUrl={cargoHoldImageUrl}
        entries={[
          { label: 'Value', value: cargoHold.totalValue },
          {
            label: 'Weight',
            value: cargoHold.totalWeight,
            limit: cargoHold.weightLimit
          }
        ]}
      />
      <Button
        variant="text"
        theme="alert"
        size="md"
        icon="trash"
        onClick={onResetItems}
      >
        Clear All
      </Button>
      <ul className={styles.list}>
        {cargoHold.items.map(item => (
          <li key={item.id}>
            <CargoCard
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              entries={[
                { label: 'Value', value: item.value },
                { label: 'Weight', value: item.weight }
              ]}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

DashboardView.propTypes = propTypes;

export { DashboardView };

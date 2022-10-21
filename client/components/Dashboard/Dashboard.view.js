import {
  arrayOf,
  bool,
  func,
  number,
  object,
  oneOf,
  oneOfType,
  shape
} from 'prop-types';

import { Button } from '../Button/Button';
import { CargoCard } from '../CargoCard/CargoCard';
import { CargoCardSkeleton } from '../CargoCard/CargoCardSkeleton';
import { Icon } from '../Icon/Icon';
import { SummaryCard } from '../SummaryCard/SummaryCard';

import cargoHoldImageUrl from './assets/cargo-hold.png';
import storageImageUrl from './assets/storage.png';

import styles from './Dashboard.module.css';

const propTypes = {
  storage: shape({
    items: arrayOf(object.isRequired).isRequired,
    totalValue: number.isRequired,
    totalWeight: number.isRequired,
    loading: bool
  }).isRequired,
  cargoHold: shape({
    items: arrayOf(object.isRequired).isRequired,
    totalValue: number.isRequired,
    totalWeight: number.isRequired,
    weightLimit: number.isRequired,
    loading: bool
  }).isRequired,
  onAddNewItem: func.isRequired,
  onResetItems: func.isRequired,
  filter: oneOfType([null, oneOf(['storage', 'cargoHold'])]),
  onMoveToCargoHold: func.isRequired,
  onMoveToStorage: func.isRequired
};

const DashboardView = ({
  cargoHold,
  storage,
  onAddNewItem,
  onResetItems,
  filter,
  onMoveToCargoHold,
  onMoveToStorage
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
        loading={storage.loading}
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

      <div className={styles.filters}>
        <Button
          variant="text"
          theme="accent"
          size="md"
          onClick={onAddNewItem}
          isActive={filter === 'storage'}
        >
          Storage
        </Button>
        <Button
          variant="text"
          theme="accent"
          size="md"
          onClick={onAddNewItem}
          isActive={filter === 'cargoHold'}
        >
          Cargo hold
        </Button>
      </div>

      <ul className={styles.list}>
        {storage.loading && <CargoCardSkeleton />}
        {storage.items.map(item => (
          <li
            key={item.id}
            tabIndex={-1}
            role="menuitem"
            onKeyDown={e => {
              // TODO: Refactor!!!
              const element = e.currentTarget;
              switch (e.key) {
                case 'ArrowLeft': {
                  break;
                }
                case 'ArrowRight': {
                  break;
                }
                case 'ArrowUp': {
                  const isFirst = !element.previousSibling;
                  if (!isFirst) {
                    element.previousElementSibling.firstChild.focus();
                  } else {
                    element.blur();
                  }

                  break;
                }
                case 'ArrowDown': {
                  const isLast = !element.nextSibling;
                  if (!isLast) {
                    element.nextElementSibling.firstChild.focus();
                  } else {
                    element.blur();
                  }
                  break;
                }
                case ' ': {
                  e.preventDefault();
                  break;
                }
                case 'Enter': {
                  onMoveToCargoHold(item.id);
                  const isLast = !element.nextSibling;
                  if (!isLast) {
                    element.nextElementSibling.firstChild.focus();
                  } else {
                    element.blur();
                  }
                }
              }
            }}
          >
            <CargoCard
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              entries={[
                { label: 'Value', value: item.value },
                { label: 'Weight', value: item.weight }
              ]}
              actionButton={
                <Button
                  variant="outlined"
                  size="sm"
                  theme="accent"
                  onClick={() => onMoveToCargoHold(item.id)}
                  tabIndex="-1"
                >
                  <Icon type="package" />
                </Button>
              }
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
        loading={cargoHold.loading}
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
              actionButton={
                <Button
                  variant="outlined"
                  size="sm"
                  theme="alert"
                  onClick={() => onMoveToStorage(item.id)}
                >
                  <Icon type="trash" />
                </Button>
              }
              // TODO: refactor
              onClick={() => onMoveToStorage(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

DashboardView.propTypes = propTypes;

export { DashboardView };

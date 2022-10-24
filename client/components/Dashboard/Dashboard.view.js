import classNames from 'classnames';
import { arrayOf, bool, func, number, object, oneOf, shape } from 'prop-types';

import { Button } from '../Button/Button';
import { CargoCard } from '../CargoCard/CargoCard';
import { CargoCardSkeleton } from '../CargoCard/CargoCardSkeleton';
import { Filter, FILTERS_ENUM } from '../Filter/Filter';
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
  filter: oneOf(['storage', 'cargoHold']).isRequired,
  onFilterChange: func.isRequired,
  onMoveToCargoHold: func.isRequired,
  onMoveToStorage: func.isRequired,
  focusedCargoCard: shape({
    cardIndex: number,
    columnIndex: number
  }).isRequired,
  onCargoCardFocus: func.isRequired
};

const DashboardView = ({
  cargoHold,
  storage,
  onAddNewItem,
  onResetItems,
  onMoveToCargoHold,
  onMoveToStorage,
  focusedCargoCard,
  onCargoCardFocus,
  filter,
  onFilterChange
}) => (
  <div className={styles.root}>
    <div
      className={classNames(styles.column, {
        [styles.hidden]: filter !== FILTERS_ENUM.storage
      })}
    >
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
        className={styles.button}
        variant="outlined"
        theme="accent"
        size="md"
        icon="plus"
        onClick={onAddNewItem}
      >
        Add New Cargo
      </Button>
      <Filter
        activeFilter={filter}
        onChange={onFilterChange}
        className={styles.filters}
      />
      <ul className={styles.list}>
        {storage.loading && <CargoCardSkeleton />}
        {storage.items.map((item, i) => (
          <li
            key={item.id}
            tabIndex={-1}
            role="menuitem"
            onKeyDown={e => storage.onKeyDown(e, item)}
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
              focused={
                focusedCargoCard.columnIndex === 0 &&
                focusedCargoCard.cardIndex === i
              }
              onFocus={() => onCargoCardFocus({ cardIndex: i, columnIndex: 0 })}
            />
          </li>
        ))}
      </ul>
    </div>

    <div
      className={classNames(styles.column, {
        [styles.hidden]: filter !== FILTERS_ENUM.cargoHold
      })}
    >
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
        className={styles.button}
        variant="text"
        theme="alert"
        size="md"
        icon="trash"
        onClick={onResetItems}
      >
        Clear All
      </Button>
      <Filter
        activeFilter={filter}
        onChange={onFilterChange}
        className={styles.filters}
      />
      <ul className={styles.list}>
        {cargoHold.items.map((item, i) => (
          <li
            key={item.id}
            tabIndex={-1}
            role="menuitem"
            onKeyDown={e => cargoHold.onKeyDown(e, item)}
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
                  theme="alert"
                  onClick={() => onMoveToStorage(item.id)}
                  tabIndex="-1"
                >
                  <Icon type="trash" />
                </Button>
              }
              focused={
                focusedCargoCard.columnIndex === 1 &&
                focusedCargoCard.cardIndex === i
              }
              onFocus={() => onCargoCardFocus({ cardIndex: i, columnIndex: 1 })}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

DashboardView.propTypes = propTypes;

export { DashboardView };

import classNames from 'classnames';
import { arrayOf, bool, func, number, object, oneOf, shape } from 'prop-types';
import { AddNewCargoPopup } from '../AddNewCargoPopup/AddNewCargoPopup';

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
    isLoading: bool
  }).isRequired,
  cargoHold: shape({
    items: arrayOf(object.isRequired).isRequired,
    totalValue: number.isRequired,
    totalWeight: number.isRequired,
    weightLimit: number.isRequired,
    isLoading: bool
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
  onCargoCardFocus: func.isRequired,
  isAddNewCargoPopupOpen: bool.isRequired,
  closeAddNewCargoPopup: func.isRequired
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
  onFilterChange,
  isAddNewCargoPopupOpen,
  closeAddNewCargoPopup
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
        isLoading={storage.isLoading}
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
        {storage.isLoading && <CargoCardSkeleton />}
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
                  size="md"
                  theme="accent"
                  onClick={() => {
                    onMoveToCargoHold(item.id);
                    onCargoCardFocus({ cardIndex: null, columnIndex: null });
                  }}
                  onMouseDown={e => e.preventDefault()}
                  tabIndex="-1"
                >
                  <Icon type="package" />
                </Button>
              }
              isFocused={
                focusedCargoCard.columnIndex === 0 &&
                focusedCargoCard.cardIndex === i
              }
              onFocus={() => onCargoCardFocus({ cardIndex: i, columnIndex: 0 })}
              onBlur={() =>
                onCargoCardFocus({ cardIndex: null, columnIndex: null })
              }
              tabIndex={i + i + 1}
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
        isLoading={cargoHold.isLoading}
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
                  size="md"
                  theme="alert"
                  onClick={() => {
                    onMoveToStorage(item.id);
                    onCargoCardFocus({ cardIndex: null, columnIndex: null });
                  }}
                  onMouseDown={e => e.preventDefault()}
                  tabIndex="-1"
                >
                  <Icon type="trash" />
                </Button>
              }
              isFocused={
                focusedCargoCard.columnIndex === 1 &&
                focusedCargoCard.cardIndex === i
              }
              onFocus={() => onCargoCardFocus({ cardIndex: i, columnIndex: 1 })}
              onBlur={() =>
                onCargoCardFocus({ cardIndex: null, columnIndex: null })
              }
              tabIndex={i + i + 2}
            />
          </li>
        ))}
      </ul>
    </div>
    <AddNewCargoPopup
      open={isAddNewCargoPopupOpen}
      onClose={closeAddNewCargoPopup}
    />
  </div>
);

DashboardView.propTypes = propTypes;

export { DashboardView };

import classNames from 'classnames';
import { arrayOf, bool, func, number, object, oneOf, shape } from 'prop-types';
import { AddNewCargoPopup } from '../AddNewCargoPopup/AddNewCargoPopup';

import { Button } from '../Button/Button';
import { Filter, FILTERS_ENUM } from '../Filter/Filter';
import { Icon } from '../Icon/Icon';
import { SummaryCard } from '../SummaryCard/SummaryCard';
import { ActionButton } from './ActionButton';

import cargoHoldImageUrl from './assets/cargo-hold.png';
import storageImageUrl from './assets/storage.png';

import styles from './Dashboard.module.css';
import { DashboardList } from './DashboardList';

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
  isPopupOpen: bool,
  focus: shape({
    set: func.isRequired,
    reset: func.isRequired,
    check: func.isRequired
  }).isRequired
};

const COLUMNS = {
  storage: 0,
  cargoHold: 1
};

const DashboardView = ({
  cargoHold,
  storage,
  onAddNewItem,
  onResetItems,
  onMoveToCargoHold,
  onMoveToStorage,
  filter,
  onFilterChange,
  isPopupOpen,
  focus
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
        tabIndex={0}
      >
        Add New Cargo
      </Button>
      <Filter
        activeFilter={filter}
        onChange={onFilterChange}
        className={styles.filters}
      />
      <DashboardList
        key={COLUMNS.storage}
        columnIndex={COLUMNS.storage}
        hasSkeleton={true}
        items={storage.items}
        ActionButton={({ item }) => (
          <ActionButton
            onClick={() => {
              onMoveToCargoHold(item.id);
              focus.reset();
            }}
            isDisabled={
              cargoHold.totalWeight + item.weight >= cargoHold.weightLimit
            }
            type="add"
          />
        )}
        calculateTabIndex={cardIndex => cardIndex * 2 + 1}
        checkFocus={focus.check}
        isLoading={storage.isLoading}
        onFocus={focus.set}
        resetFocus={focus.reset}
        onKeyDown={storage.onKeyDown}
      />
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
        tabIndex={0}
      >
        Clear All
      </Button>
      <Filter
        activeFilter={filter}
        onChange={onFilterChange}
        className={styles.filters}
      />
      <DashboardList
        key={COLUMNS.cargoHold}
        columnIndex={COLUMNS.cargoHold}
        items={cargoHold.items}
        ActionButton={({ item }) => (
          <ActionButton
            onClick={() => {
              onMoveToStorage(item.id);
              focus.reset();
            }}
            type="delete"
          />
        )}
        calculateTabIndex={cardIndex => cardIndex * 2 + 2}
        hasSkeleton={false}
        isLoading={cargoHold.isLoading}
        checkFocus={focus.check}
        onFocus={focus.set}
        resetFocus={focus.reset}
        onKeyDown={cargoHold.onKeyDown}
      />
    </div>
    <AddNewCargoPopup isOpen={isPopupOpen} />
    <span className={styles.launch}>
      <Button variant="filled" size="md" theme="action" to="/launch">
        <Icon type="rocket" />
      </Button>
    </span>
  </div>
);

DashboardView.propTypes = propTypes;

export { DashboardView };

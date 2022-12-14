import classNames from 'classnames';
import { arrayOf, bool, func, number, object, oneOf, shape } from 'prop-types';
import { AddNewCargoPopup } from '../AddNewCargoPopup/AddNewCargoPopup';

import { Button } from '../Button/Button';
import { Filter, FILTERS_ENUM } from '../Filter/Filter';
import { Icon } from '../Icon/Icon';
import { SummaryCard } from '../SummaryCard/SummaryCard';
import { Keybinding } from '../Keybinding/Keybinding';
import { DashboardActionButton } from './DashboardActionButton';

import cargoHoldImageUrl from './assets/cargo-hold.png';
import storageImageUrl from './assets/storage.png';

import styles from './Dashboard.module.css';
import { DashboardList } from './DashboardList';

const COLUMNS = {
  storage: 0,
  cargoHold: 1
};

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
    check: func.isRequired,
    isNull: bool.isRequired
  }).isRequired
};

const DashboardView = ({
  storage,
  cargoHold,
  onAddNewItem,
  onResetItems,
  filter,
  onFilterChange,
  onMoveToCargoHold,
  onMoveToStorage,
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
        isFocused={focus.isFirstElementFocused}
      >
        <p className={styles['button-with-shortcut']}>
          Add New Cargo <Keybinding button="N" />
        </p>
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
          <DashboardActionButton
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
        <p className={styles['button-with-shortcut']}>
          Clear all <Keybinding button="X" />
        </p>
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
          <DashboardActionButton
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

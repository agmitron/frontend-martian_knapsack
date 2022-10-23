import classNames from 'classnames';
import { arrayOf, bool, func, number, object, oneOf, shape } from 'prop-types';
import { useState } from 'react';

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
  filter: oneOf(['storage', 'cargoHold', null]),
  onMoveToCargoHold: func.isRequired,
  onMoveToStorage: func.isRequired
};

// TODO: think about to move it somewhere outside this file
function bindKeyboard(keyHandlerMapping) {
  return e => {
    const handler = keyHandlerMapping[e.key];

    if (handler) {
      handler(e);
    }
  };
}

function shiftFocusUp(i, edge) {
  const prev = i - 1;
  return prev < 0 ? edge : prev;
}

function shiftFocusDown(i, edge) {
  const next = i + 1;
  return next > edge ? 0 : next;
}

function shiftFocusToLast(i, last) {
  const prev = i - 1;
  return i === last ? prev : i;
}

const DashboardView = ({
  cargoHold,
  storage,
  onAddNewItem,
  onResetItems,
  onMoveToCargoHold,
  onMoveToStorage
}) => {
  const [[columnIndex, cardIndex], setSelectedCard] = useState([null, null]);
  const [filter, setFilter] = useState(FILTERS_ENUM.storage);

  const blur = () => {
    setSelectedCard([null, null]);
    document.activeElement.blur();
  };

  const switchFocusedColumn = (columnIndex, cardIndex, lastCardIndex) =>
    setSelectedCard([
      columnIndex,
      cardIndex > lastCardIndex ? lastCardIndex : cardIndex
    ]);

  return (
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
          onChange={setFilter}
          className={styles.filters}
        />
        <ul className={styles.list}>
          {storage.loading && <CargoCardSkeleton />}
          {storage.items.map((item, i) => (
            <li
              key={item.id}
              tabIndex={-1}
              role="menuitem"
              onKeyDown={bindKeyboard({
                Enter: () => {
                  onMoveToCargoHold(item.id);
                  setSelectedCard([
                    0,
                    shiftFocusToLast(i, storage.items.length - 1)
                  ]);
                },
                ArrowRight: () =>
                  switchFocusedColumn(1, i, cargoHold.items.length - 1),
                ArrowUp: () =>
                  setSelectedCard([
                    0,
                    shiftFocusUp(i, storage.items.length - 1)
                  ]),
                ArrowDown: () =>
                  setSelectedCard([
                    0,
                    shiftFocusDown(i, storage.items.length - 1)
                  ]),
                Escape: blur
              })}
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
                focused={columnIndex === 0 && cardIndex === i}
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
          onChange={setFilter}
          className={styles.filters}
        />
        <ul className={styles.list}>
          {cargoHold.items.map((item, i) => (
            <li
              key={item.id}
              tabIndex={-1}
              role="menuitem"
              onKeyDown={bindKeyboard({
                // TODO: refactor!
                Enter: () => {
                  onMoveToStorage(item.id);
                  setSelectedCard([
                    1,
                    shiftFocusToLast(i, cargoHold.items.length - 1)
                  ]);
                },
                ArrowLeft: () =>
                  switchFocusedColumn(0, i, storage.items.length - 1),
                ArrowUp: () =>
                  setSelectedCard([
                    1,
                    shiftFocusUp(i, cargoHold.items.length - 1)
                  ]),
                ArrowDown: () =>
                  setSelectedCard([
                    1,
                    shiftFocusDown(i, cargoHold.items.length - 1)
                  ]),
                Escape: blur
              })}
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
                  >
                    <Icon type="trash" />
                  </Button>
                }
                focused={columnIndex === 1 && cardIndex === i}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

DashboardView.propTypes = propTypes;

export { DashboardView };

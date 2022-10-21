import { arrayOf, bool, func, number, object, oneOf, shape } from 'prop-types';
import { useEffect, useState } from 'react';

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

const DashboardView = ({
  cargoHold,
  storage,
  onAddNewItem,
  onResetItems,
  filter,
  onMoveToCargoHold,
  onMoveToStorage
}) => {
  const [selectedCard, setSelectedCard] = useState([]); // [columnIndex, cardIndex]
  const storageCards = []; // TODO: FIX THIS CRUTCH!!!
  const cargoHoldCards = []; // TODO: FIX THIS CRUTCH!!!

  useEffect(() => {
    const [columnIndex, cardIndex] = selectedCard;
    const columns = [storageCards, cargoHoldCards];

    const column = columns.at(columnIndex);
    const neighbour = column.at(cardIndex);
    const firstCard = column.at(0);
    const focusElement = neighbour || firstCard;

    if (focusElement) {
      focusElement.focus();
    }
  }, [cargoHoldCards, selectedCard, storageCards]);

  return (
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
          {storage.items.map((item, i) => (
            <li
              key={item.id}
              tabIndex={-1}
              role="menuitem"
              onKeyDown={bindKeyboard({
                Enter: () => {
                  onMoveToCargoHold(item.id);
                  setSelectedCard([0, i]);
                },
                ArrowRight: () => setSelectedCard([1, i]),
                ArrowUp: () => setSelectedCard([0, i - 1]),
                ArrowDown: () => setSelectedCard([0, i + 1])
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
                ref={element => storageCards.push(element)}
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
          {cargoHold.items.map((item, i) => (
            <li
              key={item.id}
              tabIndex={-1}
              role="menuitem"
              onKeyDown={bindKeyboard({
                Enter: () => {
                  onMoveToStorage(item.id);
                  setSelectedCard([1, i]);
                },
                ArrowLeft: () => setSelectedCard([0, i]),
                ArrowUp: () => setSelectedCard([1, i - 1]),
                ArrowDown: () => setSelectedCard([1, i + 1])
              })}
            >
              <CargoCard
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                ref={element => cargoHoldCards.push(element)}
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

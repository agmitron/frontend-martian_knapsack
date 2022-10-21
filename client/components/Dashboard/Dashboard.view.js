import { arrayOf, bool, func, number, object, oneOf, shape } from 'prop-types';
import { useRef } from 'react';
import { noop } from '../../utils';

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

function shiftFocus($current, $next) {
  const isEdge = !$next;

  if (isEdge) {
    $current.blur();
  } else {
    $next.firstChild.focus();
  }
}

const makeColumnShortcuts = ({
  Enter = noop,
  ArrowRight = noop,
  ArrowLeft = noop,
  ArrowDown = noop,
  ArrowUp = noop
}) =>
  bindKeyboard({
    ArrowUp: e => {
      const $current = e.currentTarget;
      const $prev = $current.previousElementSibling;
      ArrowUp();
      shiftFocus($current, $prev);
    },
    ArrowDown: e => {
      const $current = e.currentTarget;
      const $next = $current.nextElementSibling;
      ArrowDown();
      shiftFocus($current, $next);
    },
    Enter: e => {
      const $current = e.currentTarget;
      const $next = $current.nextElementSibling;
      const $prev = $current.previousElementSibling;
      e.preventDefault();
      Enter();
      shiftFocus($current, $next || $prev);
    },
    ArrowLeft,
    ArrowRight
  });

const DashboardView = ({
  cargoHold,
  storage,
  onAddNewItem,
  onResetItems,
  filter,
  onMoveToCargoHold,
  onMoveToStorage
}) => {
  const storageColumnRef = useRef();
  const cargoHoldColumnRef = useRef();

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

        <ul className={styles.list} ref={storageColumnRef}>
          {storage.loading && <CargoCardSkeleton />}
          {storage.items.map(item => (
            <li
              key={item.id}
              tabIndex={-1}
              role="menuitem"
              onKeyDown={makeColumnShortcuts({
                Enter: () => onMoveToCargoHold(item.id),
                ArrowRight: () =>
                  cargoHoldColumnRef.current.firstChild.firstChild.focus() // TODO: refactor
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
        <ul className={styles.list} ref={cargoHoldColumnRef}>
          {cargoHold.items.map(item => (
            <li
              key={item.id}
              tabIndex={-1}
              role="menuitem"
              onKeyDown={makeColumnShortcuts({
                Enter: () => onMoveToStorage(item.id),
                ArrowLeft: () =>
                  storageColumnRef.current.firstChild.firstChild.focus() // TODO: refactor
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

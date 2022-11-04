import { arrayOf, bool, func, number, object } from 'prop-types';
import { CargoCard } from '../CargoCard/CargoCard';
import { CargoCardSkeleton } from '../CargoCard/CargoCardSkeleton';
import styles from './Dashboard.module.css';

const propTypes = {
  items: arrayOf(object.isRequired).isRequired,
  columnIndex: number,
  isLoading: bool,
  hasSkeleton: bool,
  onKeyDown: func,
  onFocus: func,
  checkFocus: func,
  resetFocus: func,
  calculateTabIndex: func,
  ActionButton: func
};

const DashboardList = ({
  items,
  columnIndex,
  isLoading,
  hasSkeleton,
  onKeyDown,
  onFocus,
  checkFocus,
  resetFocus,
  calculateTabIndex,
  ActionButton
}) => {
  return (
    <ul className={styles.list}>
      {hasSkeleton && isLoading && <CargoCardSkeleton />}
      {!isLoading &&
        items.map((item, cardIndex) => (
          <li
            key={item.id}
            tabIndex={-1}
            role="menuitem"
            onKeyDown={e => onKeyDown(e, item)}
          >
            <CargoCard
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              entries={[
                { label: 'Value', value: item.value },
                { label: 'Weight', value: item.weight }
              ]}
              actionButton={<ActionButton item={item} />}
              isFocused={checkFocus(columnIndex, cardIndex)}
              onFocus={() => onFocus({ cardIndex, columnIndex })}
              onBlur={resetFocus}
              tabIndex={calculateTabIndex(cardIndex)}
            />
          </li>
        ))}
    </ul>
  );
};

DashboardList.propTypes = propTypes;

export { DashboardList };

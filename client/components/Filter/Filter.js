import classNames from 'classnames';
import { func, oneOf, string } from 'prop-types';
import { Button } from '../Button/Button';
import styles from './Filter.module.css';

export const FILTERS_ENUM = {
  storage: 'storage',
  cargoHold: 'cargoHold'
};

const propTypes = {
  onChange: func.isRequired,
  activeFilter: oneOf(['storage', 'cargoHold']),
  className: string
};

const defaultProps = {
  activeFilter: null
};

const Filter = ({ onChange, activeFilter, className }) => (
  <div className={classNames(styles.root, className)}>
    <Button
      variant="text"
      theme="accent"
      size="md"
      onClick={() => onChange(FILTERS_ENUM.storage)}
      isActive={activeFilter === FILTERS_ENUM.storage}
    >
      Storage
    </Button>
    <Button
      variant="text"
      theme="accent"
      size="md"
      onClick={() => onChange(FILTERS_ENUM.cargoHold)}
      isActive={activeFilter === FILTERS_ENUM.cargoHold}
    >
      Cargo hold
    </Button>
  </div>
);

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;

export { Filter };

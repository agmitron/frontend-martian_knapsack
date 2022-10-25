import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { bool, func, node, number } from 'prop-types';
import styles from './Snackbar.module.css';
import { noop, sleep } from '../../utils';

const propTypes = {
  isOpen: bool,
  autoHideDuration: number,
  onClose: func,
  children: node
};

const defaultProps = {
  isOpen: false,
  autoHideDuration: 4000,
  onClose: noop
};

const Snackbar = ({ isOpen, autoHideDuration, onClose, children }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(!isOpen);

    // It's needed to hide the snackbar smoothly.
    sleep(autoHideDuration)
      .then(() => setHidden(true))
      .then(() => sleep(500))
      .then(onClose);
  }, [autoHideDuration, isOpen, onClose]);

  return (
    <div className={classNames(styles.root, { [styles.hidden]: hidden })}>
      {children}
    </div>
  );
};

Snackbar.propTypes = propTypes;
Snackbar.defaultProps = defaultProps;

export { Snackbar };

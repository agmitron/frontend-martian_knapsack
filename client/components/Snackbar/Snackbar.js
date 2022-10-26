import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { bool, func, node, number } from 'prop-types';
import styles from './Snackbar.module.css';
import { noop } from '../../utils';

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
  const [isHidden, setIsHidden] = useState(!isOpen);

  useEffect(() => setIsHidden(!isOpen), [isOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHidden(true);
    }, autoHideDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [autoHideDuration, isOpen]);

  useEffect(() => {
    if (isHidden) {
      const timeout = setTimeout(onClose, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isHidden, onClose]);

  return (
    <div className={classNames(styles.root, { [styles.hidden]: isHidden })}>
      {children}
    </div>
  );
};

Snackbar.propTypes = propTypes;
Snackbar.defaultProps = defaultProps;

export { Snackbar };

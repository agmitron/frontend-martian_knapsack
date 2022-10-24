import classNames from 'classnames';
import { bool, func, node } from 'prop-types';
import { useRef } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import styles from './Popup.module.css';

export const propTypes = {
  children: node,
  open: bool,
  onClose: func
};

const Popup = ({ children, open, onClose }) => {
  const overlayRef = useRef();

  return (
    <div
      ref={overlayRef}
      className={classNames(styles.overlay, { [styles.hidden]: !open })}
      onClickCapture={e => e.target === overlayRef.current && onClose()}
      role="presentation"
    >
      <div role="dialog" className={styles.popup}>
        <Button
          theme="alert"
          variant="text"
          size="sm"
          className={styles.close}
          onClick={onClose}
        >
          <Icon type="cross" />
        </Button>
        {children}
      </div>
    </div>
  );
};

Popup.propTypes = propTypes;

export { Popup };

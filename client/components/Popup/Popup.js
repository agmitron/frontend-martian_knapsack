import classNames from 'classnames';
import { bool, func, node } from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';
import { usePopup } from '../../hooks/usePopup';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import styles from './Popup.module.css';

export const propTypes = {
  children: node,
  isOpen: bool,
  onClose: func
};

const Popup = ({ children, isOpen, onClose }) => {
  const overlayRef = useRef();
  const popup = usePopup();

  const close = useCallback(() => {
    if (onClose) {
      onClose();
    }

    popup.close();
  }, [onClose, popup]);

  useEffect(() => {
    const $root = document.querySelector(':root');

    if (!$root) {
      return;
    }

    if (isOpen) {
      $root.style.setProperty('--overflow-y', 'hidden');
    } else {
      $root.style.removeProperty('--overflow-y');
    }
  }, [isOpen]);

  useEffect(() => {
    const closePopupByEscape = e => {
      if (isOpen && e.key === 'Escape') {
        popup.close();
      }
    };

    document.addEventListener('keydown', closePopupByEscape);

    return () => {
      document.removeEventListener('keydown', closePopupByEscape);
    };
  }, [isOpen, popup]);

  return (
    <div
      ref={overlayRef}
      className={classNames(styles.overlay, { [styles.hidden]: !isOpen })}
      onClickCapture={e => e.target === overlayRef.current && close()}
      role="presentation"
    >
      <div role="dialog" className={styles.popup}>
        <Button
          theme="alert"
          variant="text"
          size="sm"
          className={styles.close}
          onClick={close}
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

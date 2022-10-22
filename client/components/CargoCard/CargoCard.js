import classNames from 'classnames';
import {
  arrayOf,
  bool,
  element,
  func,
  number,
  shape,
  string
} from 'prop-types';
import { useLayoutEffect, useRef } from 'react';

import styles from './CargoCard.module.css';

const propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  imageUrl: string.isRequired,
  entries: arrayOf(
    shape({ label: string.isRequired, value: number.isRequired }).isRequired
  ).isRequired,
  loading: bool,
  actionButton: element,
  onClick: func,
  onKeyDown: func,
  focused: bool
};

const CargoCard = ({
  title,
  description,
  imageUrl,
  entries,
  loading,
  actionButton,
  onClick,
  onKeyDown,
  focused
}) => {
  const ref = useRef();

  useLayoutEffect(() => {
    if (focused) {
      ref.current.focus();
    } else {
      ref.current.blur();
    }
  }, [focused]);

  return (
    <div
      className={styles.root}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="menuitem"
      tabIndex={0}
      ref={ref}
    >
      <div
        className={classNames(styles['image-wrapper'], {
          [styles.skeleton]: loading
        })}
      >
        <img
          className={classNames(styles.image, {
            [styles.loading]: loading
          })}
          src={imageUrl}
          alt={title}
          height="116"
          width="116"
        />
      </div>
      <div className={styles.body}>
        <p
          className={classNames(styles.title, {
            [styles.skeleton]: loading,
            [styles.loading]: loading
          })}
        >
          {title}
        </p>
        {description && (
          <p
            className={classNames(styles.description, {
              [styles.skeleton]: loading,
              [styles.loading]: loading
            })}
          >
            {description}
          </p>
        )}
        <dl className={styles.list}>
          {entries.map(entry => (
            <div
              key={entry.label}
              className={classNames(styles.item, {
                [styles.skeleton]: loading,
                [styles.loading]: loading
              })}
            >
              <dt className={styles.label}>{entry.label}</dt>
              <dd className={classNames(styles.value)}>{entry.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={styles.controls}>{actionButton}</div>
    </div>
  );
};

CargoCard.propTypes = propTypes;

export { CargoCard };

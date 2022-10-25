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
  actionButton: element,
  isFocused: bool,
  isLoading: bool,
  onFocus: func,
  onClick: func,
  onKeyDown: func,
  tabIndex: number
};

const defaultProps = {
  tabIndex: 0,
  isLoading: false,
  isFocused: false
};

const CargoCard = ({
  title,
  description,
  imageUrl,
  entries,
  isLoading,
  actionButton,
  onClick,
  onKeyDown,
  isFocused,
  onFocus,
  tabIndex
}) => {
  const ref = useRef();

  useLayoutEffect(() => {
    if (isFocused) {
      ref.current.focus();
    } else {
      ref.current.blur();
    }
  }, [isFocused]);

  return (
    <div
      className={styles.root}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="menuitem"
      tabIndex={tabIndex}
      ref={ref}
      onFocus={onFocus}
    >
      <div
        className={classNames(styles['image-wrapper'], {
          [styles.skeleton]: isLoading
        })}
      >
        <img
          className={classNames(styles.image, {
            [styles.loading]: isLoading
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
            [styles.skeleton]: isLoading,
            [styles.loading]: isLoading
          })}
        >
          {title}
        </p>
        {description && (
          <p
            className={classNames(styles.description, {
              [styles.skeleton]: isLoading,
              [styles.loading]: isLoading
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
                [styles.skeleton]: isLoading,
                [styles.loading]: isLoading
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
CargoCard.defaultProps = defaultProps;

export { CargoCard };

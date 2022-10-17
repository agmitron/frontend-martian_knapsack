import { arrayOf, number, shape, string } from 'prop-types';

import styles from './CargoCard.module.css';

const propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  imageUrl: string.isRequired,
  entries: arrayOf(
    shape({ label: string.isRequired, value: number.isRequired }).isRequired
  ).isRequired
};

const CargoCard = ({ title, description, imageUrl, entries }) => (
  <div className={styles.root}>
    <img
      className={styles.image}
      src={imageUrl}
      alt={title}
      height="116"
      width="116"
    />
    <div className={styles.body}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      <dl className={styles.list}>
        {entries.map(entry => (
          <div key={entry.label} className={styles.item}>
            <dt className={styles.label}>{entry.label}</dt>
            <dd className={styles.value}>{entry.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

CargoCard.propTypes = propTypes;

export { CargoCard };

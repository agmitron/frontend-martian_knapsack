import { Fragment } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import styles from './SummaryCard.module.css';

const propTypes = {
  entries: arrayOf(
    shape({
      label: string.isRequired,
      value: number.isRequired,
      limit: number
    }).isRequired
  ).isRequired,
  title: string.isRequired,
  imageUrl: string.isRequired
};

const SummaryCard = ({ entries, title, imageUrl }) => (
  <div className={styles.root} style={{ '--bg-image-url': `url(${imageUrl})` }}>
    <h2 className={styles.title}>{title}</h2>
    <dl className={styles.list}>
      {entries.map(entry => (
        <Fragment key={entry.label}>
          <dt className={styles.label}>{entry.label}</dt>
          <dd className={styles.value}>
            {entry.limit
              ? `${entry.value}\xa0/\xa0${entry.limit}`
              : entry.value}
          </dd>
        </Fragment>
      ))}
    </dl>
  </div>
);

SummaryCard.propTypes = propTypes;

export { SummaryCard };

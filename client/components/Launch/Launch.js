import { Button } from '../Button/Button';

import { useApplicationState } from '../../contexts/ApplicationStore/ApplicationStore';

import { LaunchAnimation } from './components/LaunchAnimation/LaunchAnimation';

import styles from './Launch.module.css';

const Launch = () => {
  const { cargoHoldItems } = useApplicationState();

  return (
    <div className={styles.root}>
      <LaunchAnimation />
      <h1 className={styles.title}>Rocket with cargo successfully launched</h1>
      <ul className={styles.list}>
        {cargoHoldItems.map(item => (
          <li className={styles.item} key={item.id}>
            <figure>
              <img
                className={styles.image}
                src={item.imageUrl}
                alt=""
                height="116"
                width="116"
              />
              <figcaption className={styles.caption}>{item.title}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <Button
        className={styles.button}
        to="/"
        variant="outlined"
        theme="accent"
        size="md"
        icon="package"
      >
        Pack New Cargo Hold
      </Button>
    </div>
  );
};

export { Launch };

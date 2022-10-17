import MarsIllustration from './assets/mars.svg';
import RocketIllustration from './assets/rocket.svg';

import styles from './LaunchAnimation.module.css';

const LaunchAnimation = () => (
  <div className={styles.root}>
    <RocketIllustration className={styles.rocket} />
    <MarsIllustration className={styles.mars} />
  </div>
);

export { LaunchAnimation };

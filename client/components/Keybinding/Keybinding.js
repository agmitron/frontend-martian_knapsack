import { string } from 'prop-types';
import styles from './Keybinding.module.css';

const propTypes = {
  button: string.isRequired
};

const Keybinding = ({ button }) => (
  <span className={styles.root}>{button}</span>
);

Keybinding.propTypes = propTypes;

export { Keybinding };

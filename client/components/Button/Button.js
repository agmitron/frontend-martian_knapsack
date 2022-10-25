import { bool, oneOf, string, node } from 'prop-types';
import cx from 'classnames';

import { Clickable } from '../Clickable/Clickable';
import { Icon } from '../Icon/Icon';

import styles from './Button.module.css';

const propTypes = {
  children: node.isRequired,
  className: string,
  icon: string,
  size: oneOf(['md', 'sm']).isRequired,
  theme: oneOf(['accent', 'alert', 'action']).isRequired,
  variant: oneOf(['filled', 'outlined', 'text']).isRequired,
  isActive: bool,
  isDisabled: bool
};

const defaultProps = {
  className: null,
  icon: null,
  isDisabled: false,
  isActive: false
};

const Button = ({
  children,
  className,
  icon,
  size,
  theme,
  variant,
  isDisabled,
  isActive,
  ...restProps
}) => (
  <Clickable
    className={cx(
      styles.root,
      styles[`size_${size}`],
      styles[`theme_${theme}`],
      styles[`variant_${variant}`],
      className,
      {
        [styles.state_active]: isActive,
        [styles.state_disabled]: isDisabled
      }
    )}
    isDisabled={isDisabled}
    {...restProps}
  >
    <span className={styles.label}>
      {icon && <Icon className={styles.icon} type={icon} />}
      {children}
    </span>
  </Clickable>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export { Button };

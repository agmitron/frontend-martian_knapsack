import { bool, oneOf, string, node } from 'prop-types';
import cx from 'classnames';

import { Clickable } from '../Clickable/Clickable';
import { Icon } from '../Icon/Icon';

import styles from './Button.module.css';

const propTypes = {
  children: node.isRequired,
  className: string,
  icon: string,
  size: oneOf(['md']).isRequired,
  theme: oneOf(['accent', 'alert']).isRequired,
  variant: oneOf(['outlined', 'text']).isRequired,
  isDisabled: bool
};

const defaultProps = {
  className: null,
  icon: null,
  isDisabled: false
};

const Button = ({
  children,
  className,
  icon,
  size,
  theme,
  variant,
  isDisabled,
  ...restProps
}) => (
  <Clickable
    className={cx(
      styles.root,
      styles[`size_${size}`],
      styles[`theme_${theme}`],
      styles[`variant_${variant}`],
      className
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

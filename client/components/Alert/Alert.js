import classNames from 'classnames';
import { node, oneOf } from 'prop-types';
import { Icon } from '../Icon/Icon';
import styles from './Alert.module.css';

const propTypes = {
  severity: oneOf(['success', 'info', 'warning', 'error']).isRequired,
  children: node.isRequired
};

const MAP_SEVERITY_TO_ICON = {
  success: 'success',
  info: 'info',
  error: 'info',
  warning: 'warning'
};

const Alert = ({ severity, children }) => (
  <div className={classNames(styles.root, styles[severity])}>
    <Icon type={MAP_SEVERITY_TO_ICON[severity]} />
    <div>{children}</div>
  </div>
);

Alert.propTypes = propTypes;

export { Alert };

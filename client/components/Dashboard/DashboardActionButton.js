import { bool, func, oneOf } from 'prop-types';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const propTypes = {
  type: oneOf(['add', 'delete']).isRequired,
  onClick: func,
  isDisabled: bool
};

const ACTION_TYPE_TO_ICON = {
  add: 'package',
  delete: 'trash'
};

const ACTION_TYPE_TO_THEME = {
  add: 'accent',
  delete: 'alert'
};

const DashboardActionButton = ({ onClick, isDisabled, type }) => (
  <Button
    variant="outlined"
    size="md"
    theme={ACTION_TYPE_TO_THEME[type]}
    onClick={onClick}
    onMouseDown={e => e.preventDefault()}
    tabIndex="-1"
    isDisabled={isDisabled}
  >
    <Icon type={ACTION_TYPE_TO_ICON[type]} />
  </Button>
);

DashboardActionButton.propTypes = propTypes;

export { DashboardActionButton };

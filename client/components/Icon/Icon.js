import { oneOf } from 'prop-types';

import PackageIcon from './assets/package.svg';
import PlusIcon from './assets/plus.svg';
import RocketIcon from './assets/rocket.svg';
import TrashIcon from './assets/trash.svg';
import ArrowIcon from './assets/arrow.svg';
import CrossIcon from './assets/cross.svg';
import InfoIcon from './assets/info.svg';
import WarningIcon from './assets/warning.svg';
import SuccessIcon from './assets/success.svg';

const MAP_TYPE_TO_ICON = {
  package: PackageIcon,
  plus: PlusIcon,
  rocket: RocketIcon,
  trash: TrashIcon,
  arrow: ArrowIcon,
  cross: CrossIcon,
  info: InfoIcon,
  warning: WarningIcon,
  success: SuccessIcon
};

const propTypes = {
  type: oneOf(Object.keys(MAP_TYPE_TO_ICON)).isRequired
};

const Icon = ({ type, ...restProps }) => {
  const IconToRender = MAP_TYPE_TO_ICON[type];

  return <IconToRender {...restProps} />;
};

Icon.propTypes = propTypes;

export { Icon };
